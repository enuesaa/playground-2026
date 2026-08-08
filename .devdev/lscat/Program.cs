using System;
using System.IO;

class Program
{
    static void Main()
    {
        Console.Write("> ");
        string? path = Console.ReadLine();

        if (string.IsNullOrWhiteSpace(path))
        {
            Console.Error.WriteLine("please enter text.");
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
            Console.Error.WriteLine($"file not found: {path}");
            Environment.Exit(1);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"err: {ex.Message}");
            Environment.Exit(1);
        }
    }
}
