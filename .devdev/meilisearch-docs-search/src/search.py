import meilisearch

client = meilisearch.Client("http://localhost:7700")
index = client.index("projects")

result = index.search(
    "node.js",
    # {
    #     "hybrid": {
    #         "embedder": "default",
    #         "semanticRatio": 0.5,
    #     },
    # },
)

for hit in result["hits"]:
    print(hit["project"])
