from datetime import datetime, timedelta
from airflow.decorators import dag, task

@dag(
    dag_id="my_first_dag",
    schedule="@daily",          # cron 式も可: "0 9 * * *"
    start_date=datetime(2024, 1, 1),
    catchup=False,               # 過去分を実行しない
    default_args={"retries": 1, "retry_delay": timedelta(minutes=5)},
)
def my_first_dag():
    @task
    def extract() -> dict:
        """データを取得するステップ"""
        return {"value": 42, "source": "api"}

    @task
    def transform(data: dict) -> dict:
        """データを変換するステップ"""
        return {"result": data["value"] * 2, "source": data["source"]}

    @task
    def load(data: dict):
        """結果を出力・保存するステップ"""
        print(f"Loaded: {data}")

    # タスクの依存関係を定義（XCom で自動受け渡し）
    raw = extract()
    transformed = transform(raw)
    load(transformed)

my_first_dag()  # DAG をインスタンス化
