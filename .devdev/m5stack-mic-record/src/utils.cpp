#include "utils.hpp"

namespace utils {
void generate_session_id(char *out, size_t length) {
    const char charset[] = "abcdefghijklmnopqrstuvwxyz0123456789";
    size_t charset_len = sizeof(charset) - 1;

    for (size_t i = 0; i < length; i++) {
        out[i] = charset[esp_random() % charset_len];
    }
    out[length] = '\0';
}
}