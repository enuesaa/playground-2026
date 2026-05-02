#include <M5Unified.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "vars.hpp"
#include "base64.hpp"

WiFiUDP ntpUDP;
WiFiClientSecure net;
PubSubClient client(net);

static int16_t rec_buffer[16000 * 3];

void setup() {
  M5.begin();
  M5.Mic.begin();
  M5.Lcd.setTextSize(3);
  M5.Speaker.setVolume(150);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    M5.delay(1000);
  }
  M5.Display.println("wifi ok");

  net.setCACert(AWSIOT_ROOT_CA);
  net.setCertificate(AWSIOT_CERTIFICATE);
  net.setPrivateKey(AWSIOT_PRIVATE_KEY);
  client.setServer(AWSIOT_ENDPOINT, 8883);
  client.setBufferSize(2048);

  while (!client.connected()) {
    if (!client.connect(AWSIOT_THING_ID)) {
      M5.delay(1000);
    }
  }
  M5.Display.println("MQTT OK");
  client.publish("sdk/test/python", "hello");

  M5.Display.println("Start in 2 sec...");
  M5.delay(2000);

  M5.Display.println("Recording 3 sec...");
  M5.Mic.record(rec_buffer, 16000 * 3, 16000);
  M5.delay(3000);
  M5.Display.println("Record done");
  
  int samples = 16000 * 3;
  int totalBytes = samples * 2;
  int chunkSize = 1024;
  uint8_t* ptr = (uint8_t*)rec_buffer;
  unsigned char b64buf[1600];
  client.publish("sdk/test/python", "start");

  char session[16];
  sprintf(session, "%lu", millis());

  // だいたい93チャンク
  for (int i = 0; i < totalBytes; i += chunkSize) {
    int size = min(chunkSize, totalBytes - i);
    unsigned int out_len = encode_base64(ptr+i, size, b64buf);
    char payload[1500];
    snprintf(payload, sizeof(payload), "{\"seq\":%d,\"session\":\"%s\",\"data\":\"%s\"}", i / chunkSize, session, b64buf);

    bool ok = client.publish("m5/audio/chunk", payload);
    if (!ok) {
      M5.Display.printf("publish failed at seq=%d\n", i / chunkSize);
    }
    M5.delay(10);
  }
  client.publish("sdk/test/python", "end");
  M5.Display.println("Publish done");
}

void loop() {}
