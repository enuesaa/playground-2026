# Cloudflare AI Search

- 検索インデックスの作成サービス
- サイト内検索もできるし、ストレージにアップロードしたコンテンツに対して検索することもできる
- AI と最適化されている (ようはベクトル検索するみたいな) ので AI というネーミングになっているが、機能としてはただのサイト内検索。
- Google Cloud Vertex AI Search によく似ている。
  - https://github.com/enuesaa/playground-2026/blob/main/google-cloud-vertex-ai-search-try/README.md
- Public API を発行できる
  - のでサイトからAPIを組み込めばサイト内検索を簡単に実現できる
  - サンプルコンポーネントがここに公開されている。  
  https://search.ai.cloudflare.com/
- Workers から binding することもできるらしい
  - https://www.mitsue.co.jp/knowledge/blog/x-tech/202601/19_1741.html
- 2026年10月にGA
  - https://blog.cloudflare.com/ai-search-ga/

## Links
- https://developers.cloudflare.com/ai-search/
- https://dev.classmethod.jp/articles/cloudflare-ai-search/
