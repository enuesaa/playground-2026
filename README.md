# azure-devops-try

SQL Server でテーブル作成
```sql
CREATE TABLE notes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
    content NVARCHAR(MAX) NULL,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
);

INSERT INTO notes (title, content) VALUES
(N'テスト', 'this is test'),
('test', 'test'),
('aaa', 'aaa'),
('bbb', 'test');

DELETE FROM notes;
```
