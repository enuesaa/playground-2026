# neo4j

- クエリは Cypher って言語らしい。
  - Gremlin とは別物
  - Neptune も対応している
- 管理画面こんなにわかりやすかったけな。

## サンプルクエリ
create
```cypher
CREATE
  (:Person {id: 1, name: "Alice", age: 30}),
  (:Person {id: 2, name: "Bob", age: 25}),
  (:Person {id: 3, name: "Charlie", age: 35});
```

read
```cypher
MATCH (p:Person)
RETURN p.id, p.name, p.age;
```

read (検索)
```cypher
MATCH (p:Person)
WHERE p.age >= 30
RETURN p;
```

update
```cypher
MATCH (p:Person {id: 1})
SET p.age = 31
RETURN p;
```

update (プロパティ削除)
```cypher
MATCH (p:Person {id: 1})
REMOVE p.country
RETURN p;
```

delete
```cypher
MATCH (p:Person {id: 2})
DELETE p;
```

relation
```cypher
MATCH (a:Person {name: "Alice"})
MATCH (b:Person {name: "Charlie"})
CREATE (a)-[:KNOWS]->(b);
```

relation (更新)
```cypher
MATCH (:Person {name: "Alice"})-[r:KNOWS]->(:Person {name: "Charlie"})
SET r.since = 2025
RETURN r;
```

relation (削除)
```cypher
MATCH (:Person {name: "Alice"})-[r:KNOWS]->(:Person {name: "Charlie"})
DELETE r;
```

グラフ全体
```cypher
MATCH (n)
OPTIONAL MATCH (n)-[r]->(m)
RETURN n, r, m;
```
