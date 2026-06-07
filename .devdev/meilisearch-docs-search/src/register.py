import pathlib
import meilisearch

client = meilisearch.Client("http://localhost:7700")
index = client.index("projects")

docs = []

for readme in pathlib.Path("../../").glob("*/README.md"):
    print(readme.parent.name)
    docs.append(
        {
            "id": readme.parent.name,
            "project": readme.parent.name,
            "path": str(readme),
            "content": readme.read_text(),
        }
    )
index.add_documents(docs)

# index.update_settings(
#     {
#         "embedders": {
#             "default": {
#                 "source": "openAi",
#                 "apiKey": "...",
#                 "model": "text-embedding-3-small",
#             }
#         }
#     }
# )
