#include <fmt/core.h>
#include <fmt/color.h>
#include <fmt/ranges.h>

#include <vector>

struct Point {
    int x;
    int y;
};

template <>
struct fmt::formatter<Point> : fmt::formatter<std::string> {
    auto format(const Point& p, format_context& ctx) const {
        return fmt::formatter<std::string>::format(
            fmt::format("({}, {})", p.x, p.y), ctx);
    }
};

int main() {
    fmt::print("hello, {}!\n", "fmtlib");
    fmt::print("fmt version: {}\n", FMT_VERSION);

    // 位置引数らしい
    fmt::print("{0} + {1} = {2}\n", 2, 3, 2 + 3);

    // 色
    fmt::print(fg(fmt::color::green) | fmt::emphasis::bold, "Success: build works!\n");

    Point p{1, 2};
    fmt::print("point: {}\n", p);

    return 0;
}
