#include <M5Unified.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "vars.hpp"

WiFiUDP ntpUDP;
WiFiClientSecure net;
PubSubClient client(net);

void setup() {
  M5.begin();
  M5.Speaker.setVolume(150);
  M5.Speaker.setAllChannelVolume(150);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    M5.delay(1000);
  }
  M5.Lcd.setTextSize(6);
  M5.Display.println("OK");

  net.setCACert(AWSIOT_ROOT_CA);
  net.setCertificate(AWSIOT_CERTIFICATE);
  net.setPrivateKey(AWSIOT_PRIVATE_KEY);
  client.setServer(AWSIOT_ENDPOINT, 8883);

  while (!client.connected()) {
    if (client.connect(AWSIOT_THING_ID)) {
      M5.Display.println("MQTT OK");
    } else {
      M5.delay(1000);
    }
  }
  client.publish("sdk/test/python", "hello");
}

void loop() {
  M5.update();
}
