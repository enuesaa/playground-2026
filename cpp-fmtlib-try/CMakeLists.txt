cmake_minimum_required(VERSION 3.14)
project(fmt_try CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
FetchContent_Declare(
  fmt
  GIT_REPOSITORY https://github.com/fmtlib/fmt.git
  GIT_TAG 12.2.0
)
FetchContent_MakeAvailable(fmt)

add_executable(fmt_try main.cpp)
target_link_libraries(fmt_try PRIVATE fmt::fmt)
target_compile_options(fmt_try PRIVATE -Wall -Wextra)
