#include <M5Unified.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "vars.hpp"

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

  M5.delay(2000);
  M5.Display.println("Playing...");
  M5.Speaker.playRaw((const int16_t*)rec_buffer, 16000 * 3, 16000);
  M5.Display.println("Done");

  bool ok = client.publish("audio/raw", (uint8_t*)rec_buffer, 16000 * 3);
  if (ok) {
    M5.Display.println("Publish OK");
  } else {
    M5.Display.println("Publish FAILED");
  }
}

void loop() {}
