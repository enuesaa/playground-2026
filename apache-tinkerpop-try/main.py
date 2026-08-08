from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.process.anonymous_traversal import traversal

g = traversal().with_remote(DriverRemoteConnection('ws://localhost:8182/gremlin', 'g'))

# ノード追加
g.add_v('person').property('name', 'marko').next()

# 検索
names = g.V().has_label('person').values('name').to_list()
print(names)
