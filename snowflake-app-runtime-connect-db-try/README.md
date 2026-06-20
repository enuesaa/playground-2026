# snowflake app runtime connect db

- snowflake の db へつなぐ
- 大変だった
- snowflake に対応しているormがそもそもないから、snowflake-sdk を使う必要ある
- その上で snowflake app runtime が環境変数にクレデンシャルを置いているっぽいのでそれをみてDBへアクセスする感じ
