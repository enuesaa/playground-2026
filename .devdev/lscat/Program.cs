using System;
using System.IO;

class Program
{
    static void Main()
    {
        string? path = Console.ReadLine();

        if (string.IsNullOrWhiteSpace(path))
        {
            Console.Error.WriteLine("パスが入力されていません。");
            Environment.Exit(1);
        }

        try
        {
            using var reader = new StreamReader(path!);
            string? line;
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }
        }
        catch (FileNotFoundException)
        {
            Console.Error.WriteLine($"ファイルが見つかりません: {path}");
            Environment.Exit(1);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"エラー: {ex.Message}");
            Environment.Exit(1);
        }
    }
}
