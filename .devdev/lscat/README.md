# lscat

- dotnet で作成
  過去のやつ
  https://github.com/enuesaa/playground-2025/tree/main/dotnet-webapp-try
- エントリポイントは Main 関数があるところらしい
  - というか最近は Program.cs に直でもかけるらしい
- 括弧の位置は Allman スタイルらしい
  - dotnet format するとこうなる
- 依存パッケージの追加の仕方
  - `dotnet add package Sharprompt`

Commands
```bash
brew install dotnet-sdk
dotnet --version
dotnet new web -o lscat
cd lscat

### run
dotnet run

### fmt
dotnet format

### build
dotnet build
```
