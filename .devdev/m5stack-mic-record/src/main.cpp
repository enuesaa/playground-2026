#include "base64.hpp"
#include "ui.hpp"
#include "vars.hpp"
#include "network.hpp"
#include <M5Unified.h>

ui::Button btn(100, 80, 120, 60, "OK");
ui::StatusArea status(20, 160, 280, 60);

void setup() {
    M5.begin();
    M5.Mic.begin();
    M5.Lcd.setTextSize(3);
    M5.Speaker.setVolume(150);
    status.setText("Initializing..");

    if (!network::connectWiFi()) {
        status.setText("WiFi failed");
        return;
    }
    if (!network::connectMQTT()) {
        status.setText("MQTT failed");
        return;
    }
    btn.draw();
    status.setText("Ready");
}

static int16_t rec_buffer[512];
int seq = 0;
char msid[11];

void processAudio() {
    M5.Mic.record(rec_buffer, 512, 16000);
    while (M5.Mic.isRecording()) {
        M5.delay(1);
    }
    unsigned char b64buf[1500];
    unsigned int out_len = encode_base64((uint8_t*)rec_buffer, 512 * 2, b64buf);
    b64buf[out_len] = '\0';
    network::publishAudioChunkMessage(msid, seq, b64buf);
    seq++;
}

void loop() {
    M5.update();
    auto t = M5.Touch.getDetail();

    if (t.wasPressed() && btn.contains(t.x, t.y)) {
        seq = 0;
        network::genMsid(msid);
        btn.setStreaming(true);
        status.setText("Recording...");
    }

    if (btn.streaming) {
        processAudio();
    }

    if (t.wasReleased() && btn.streaming) {
        network::publishAudioEndMessage(msid);
        btn.setStreaming(false);
        status.setText("Stopped");
    }
}
