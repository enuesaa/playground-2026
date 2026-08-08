using System;
using System.IO;
using Sharprompt;

class Program
{
    static void Main()
    {
        var files = Directory.GetFiles(".");

        if (files.Length == 0)
        {
            Console.Error.WriteLine("There are no files here.");
            Environment.Exit(1);
        }

        while (true)
        {
            string selected = Prompt.Select("Please select a file", items: files);
            try
            {
                Console.WriteLine($"=== {selected} ===");

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
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"err: {ex.Message}");
            }
            Console.WriteLine();
        }
    }
}
