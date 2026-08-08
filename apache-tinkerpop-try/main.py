from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection
from gremlin_python.process.anonymous_traversal import traversal
from gremlin_python.process.graph_traversal import __
from gremlin_python.process.traversal import P

g = traversal().with_remote(DriverRemoteConnection('ws://localhost:8182/gremlin', 'g'))

g.V().drop().iterate()

# --- データ投入 ---
app = g.add_v('package').property('name', 'my-app').property('version', '1.0.0').next()
express = g.add_v('package').property('name', 'express').property('version', '4.18.0').next()
lodash = g.add_v('package').property('name', 'lodash').property('version', '4.17.21').next()
axios = g.add_v('package').property('name', 'axios').property('version', '1.6.0').next()
debug = g.add_v('package').property('name', 'debug').property('version', '4.3.4').next()
ms = g.add_v('package').property('name', 'ms').property('version', '2.1.2').next()

# --- 依存関係エッジ ---
g.V(app).add_e('depends_on').to(__.V(express)).property('type', 'direct').next()
g.V(app).add_e('depends_on').to(__.V(lodash)).property('type', 'direct').next()
g.V(app).add_e('depends_on').to(__.V(axios)).property('type', 'direct').next()
g.V(express).add_e('depends_on').to(__.V(debug)).property('type', 'transitive').next()
g.V(axios).add_e('depends_on').to(__.V(debug)).property('type', 'transitive').next()
g.V(debug).add_e('depends_on').to(__.V(ms)).property('type', 'transitive').next()

# --- 1. my-appの直接依存 ---
print("直接依存:", g.V().has('name', 'my-app').out('depends_on').values('name').to_list())

# --- 2. my-appの全依存（多段まで辿る） ---
print("全依存(再帰):", g.V().has('name', 'my-app').repeat(__.out('depends_on')).emit().values('name').to_list())

# --- 3. debugパッケージに依存しているものは誰か（逆向き探索） ---
print("debugへの依存元:", g.V().has('name', 'debug').in_('depends_on').values('name').to_list())

# --- 4. 複数箇所から依存されているパッケージ（重複依存の検出） ---
print("重複依存パッケージ:", g.V().has_label('package').where(__.in_('depends_on').count().is_(P.gt(1))).values('name').to_list())

# --- 5. 依存の深さ(パス長)を含めて表示 ---
print("依存パス:", g.V().has('name', 'my-app').repeat(__.out('depends_on')).emit().path().by('name').to_list())

# --- 6. 直接 vs 推移的依存の件数 ---
print("依存タイプ別件数:", g.E().has_label('depends_on').group().by('type').by(__.count()).next())

# --- 7. パッケージ総数 ---
print("パッケージ総数:", g.V().has_label('package').count().next())

# --- 8. 循環依存チェック（もしあれば検出） ---
print(
    "循環依存:",
    g.V().has_label('package')
        .repeat(__.out('depends_on').simple_path())
        .until(__.cyclicPath().or_(__.not_(__.out('depends_on'))))
        .cyclic_path()
        .path().by('name')
        .to_list()
)
