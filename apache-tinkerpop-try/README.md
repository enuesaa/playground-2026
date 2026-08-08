# Apache TinkerPop

- グラフDBの上位レイヤー（クエリ層）らしい
- いろんなグラフDBに対応している？
  - neo4jとは相性が悪いらしい
- Gremlinという言語？でデータを操作できる
- compose.yml の gremlin-server は、TinkerGraph という軽量なグラフDBを内蔵しているらしい
  - https://tinkerpop.apache.org/docs/current/reference/#tinkergraph-gremlin
- こうしてみると Gremlin は難しいなあ。ちょっと初見では解釈できない

## メモ
project というのは、こういうこと
```
g.V().project('name', 'label').by('name').by(__.label())

-->
{
  'name': <val>, // by('name')で取れた値
  'label': <val> // by(__.label()) で取れた値
}
```