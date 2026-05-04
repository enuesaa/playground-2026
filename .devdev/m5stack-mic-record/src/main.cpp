#include "base64.hpp"
#include "ui.hpp"
#include "vars.hpp"
#include "network.hpp"
#include "utils.hpp"
#include <M5Unified.h>

ui::Button btn(100, 80, 120, 60, "OK");
ui::StatusArea status(20, 160, 280, 60);

// static int16_t rec_buffer[16000 * 3];

void setup() {
    M5.begin();
    M5.Mic.begin();
    M5.Lcd.setTextSize(3);
    M5.Speaker.setVolume(150);

    if (!network::connectWiFi()) {
        M5.Display.println("wifi failed");
        return;
    }
    if (!network::connectMQTT()) {
        M5.Display.println("mqtt failed");
        return;
    }
    btn.draw();
    status.setText("Ready");
    // M5.delay(2000);

    // M5.Display.println("Recording 3 sec...");
    // M5.Mic.record(rec_buffer, 16000 * 3, 16000);
    // M5.delay(3000);
    // M5.Display.println("Record done");

    // int samples = 16000 * 3;
    // int totalBytes = samples * 2;
    // int chunkSize = 1024;
    // uint8_t *ptr = (uint8_t *)rec_buffer;
    // unsigned char b64buf[1600];
    // network::publish("debug", "start");

    // char session[11];
    // utils::generate_session_id(session, 10);

    // for (int i = 0; i < totalBytes; i += chunkSize) {
    //     int size = min(chunkSize, totalBytes - i);
    //     unsigned int out_len = encode_base64(ptr + i, size, b64buf);
    //     char payload[1500];
    //     snprintf(payload, sizeof(payload), "{\"seq\":%d,\"session\":\"%s\",\"data\":\"%s\"}", i / chunkSize, session, b64buf);

    //     bool ok = network::publish("m5/audio/chunk", payload);
    //     if (!ok) {
    //         M5.Display.printf("publish failed at seq=%d\n", i / chunkSize);
    //     }
    //     M5.delay(10);
    // }
    // char end_payload[64];
    // snprintf(end_payload, sizeof(end_payload), "{\"session\":\"%s\"}", session);
    // network::publish("m5/audio/end", end_payload);
    // M5.Display.println("Publish done");
}

static int16_t rec_buffer[512]; // 約32ms
bool streaming = false;
int seq = 0;
char session[11];

void processAudio() {
    M5.Mic.record(rec_buffer, 512, 16000);
    while (M5.Mic.isRecording()) { M5.delay(1); }

    unsigned char b64buf[1500];
    encode_base64((uint8_t*)rec_buffer, 512 * 2, b64buf);

    char payload[1600];
    snprintf(payload, sizeof(payload), "{\"seq\":%d,\"session\":\"%s\",\"data\":\"%s\"}", seq++, session, b64buf);
    network::publish("m5/audio/chunk", payload);
}

void loop() {
    M5.update();

    auto t = M5.Touch.getDetail();
    if (t.wasPressed() && btn.contains(t.x, t.y)) {
        btn.pressed = true;
        btn.draw();

        utils::generate_session_id(session, 10);
        seq = 0;
        streaming = true;
        status.setText("Recording...");
    }

    if (streaming) {
        processAudio();
    }

    if (t.wasReleased() && btn.pressed) {
        streaming = false;
        char end_payload[64];
        snprintf(end_payload, sizeof(end_payload), "{\"session\":\"%s\"}", session);
        network::publish("m5/audio/end", end_payload);

        btn.pressed = false;
        btn.draw();
        status.setText("Stopped");
    }
}
