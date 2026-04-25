from google.cloud import bigtable
from google.cloud.bigtable.data import row_filters, BigtableDataClientAsync, ReadRowsQuery
import asyncio

project_id = ''
instance_id = ''
table_id = ''

async def main():
    client = BigtableDataClientAsync(project=project_id)
    table = client.get_table(instance_id, table_id)

    query = ReadRowsQuery()
    async for row in await table.read_rows_stream(query):
        cell = row.cells[0]
        print(cell.value.decode("utf-8"))

asyncio.run(main())
