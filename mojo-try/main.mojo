# see https://mojolang.org/docs/manual/quickstart/

def main():
    print("Temperature Analyzer")

    # var が必要
    # 型もかける。これはコンパイル時に評価されるっぽい
    var temps: List[Float64] = [20.5, 22.3, 19.8, 25.1]

    print("Recorded", len(temps), "temperatures")

    for index in range(len(temps)):
        # これ違う。tが必要？
        print(t"  Day {index + 1}: {temps[index]}°C")

    try:
        var avg = calculate_average(temps)
        print(t"Average: {round(avg, 2)}°C")

        if avg > 25.0:
            print("Status: Hot week")
        elif avg > 20.0:
            print("Status: Comfortable week")
        else:
            print("Status: Cool week")
    except e:
        print("Error:", e)

def calculate_average(temps: List[Float64]) raises -> Float64:
    # this raises error
    if len(temps) == 0:
        raise Error("No temperature data")
    var total = 0.0
    for temp in temps:
        total += temp
    return total / Float64(len(temps))
