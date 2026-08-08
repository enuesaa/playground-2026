using System;
using System.IO;
using Sharprompt;

class Program
{
    static void Main()
    {
        string dir = Directory.GetCurrentDirectory();
        var files = Directory.GetFiles(dir);

        if (files.Length == 0)
        {
            Console.Error.WriteLine("There are no files here.");
            Environment.Exit(1);
        }

        string selected = Prompt.Select("Please select a file", items: files);
        // Console.Write("> ");
        // string? path = Console.ReadLine();

        // if (string.IsNullOrWhiteSpace(path))
        // {
        //     Console.Error.WriteLine("please enter text.");
        //     Environment.Exit(1);
        // }

        try
        {
            using var reader = new StreamReader(selected!);
            string? line;
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }
        }
        catch (FileNotFoundException)
        {
            Console.Error.WriteLine($"file not found: {selected}");
            Environment.Exit(1);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"err: {ex.Message}");
            Environment.Exit(1);
        }
    }
}
