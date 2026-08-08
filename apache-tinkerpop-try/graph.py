import networkx as nx
import matplotlib.pyplot as plt
from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.process.anonymous_traversal import traversal
from gremlin_python.process.graph_traversal import __

g = traversal().with_remote(DriverRemoteConnection('ws://localhost:8182/gremlin', 'g'))

# --- Gremlinから頂点とエッジを取得 ---
nodes = g.V().project('name', 'label').by('name').by(__.label()).to_list()
edges = g.E().project('from', 'to', 'type').by(__.out_v().values('name')).by(__.in_v().values('name')).by('type').to_list()

# --- networkxのグラフに変換 ---
G = nx.DiGraph()
for n in nodes:
    G.add_node(n['name'], label=n['label'])
for e in edges:
    G.add_edge(e['from'], e['to'], type=e['type'])

# --- 描画 ---
pos = nx.spring_layout(G, seed=42)  # レイアウトアルゴリズム
node_colors = ['#7F77DD' if G.nodes[n]['label'] == 'package' else '#1D9E75' for n in G.nodes]
edge_colors = ['#D85A30' if G.edges[e]['type'] == 'direct' else '#B4B2A9' for e in G.edges]

plt.figure(figsize=(8, 6))
nx.draw(
    G, pos,
    with_labels=True,
    node_color=node_colors,
    edge_color=edge_colors,
    node_size=1800,
    font_size=9,
    arrowsize=15,
)
plt.title("Dependency graph")
plt.tight_layout()
plt.savefig('graph.png', dpi=150)
plt.show()
