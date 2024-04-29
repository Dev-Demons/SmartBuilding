using System.IO;
using JetBrains.Annotations;
using UnityEditor;
using UnityEngine;

public class Exporter
{
    // this is called by command Line
    [UsedImplicitly]
    [MenuItem("Decentraland/Export Skyboxes")]
    public static void ExportSkyboxes()
    {
        var args = System.Environment.GetCommandLineArgs();
        var basePath = Application.dataPath + "/../../output/";
        string path = Path.Combine(basePath, "hello.txt");
        
        if (!Directory.Exists(basePath))
        {
            Directory.CreateDirectory(basePath);
        }
        else
        {
            Directory.Delete(basePath, true);
            Directory.CreateDirectory(basePath);
        }
        
        File.WriteAllText(path, "Hello World\n");
        File.AppendAllLines(path, new []{ "Args:\n" });
        
        foreach (string arg in args)
        {
            File.AppendAllLines(path, new []{ $"{arg}\n" });
        }
    }
}