# app.py
import os
import psycopg2
from flask import Flask

app = Flask(__name__)

@app.route("/")
def health():
    try:
        conn = psycopg2.connect(
            host=os.environ["DB_HOST"],
            port=5432,
            dbname="postgres",
            user="postgres",
            password=os.environ["DB_PASSWORD"],
            connect_timeout=5,
        )
        cur = conn.cursor()
        cur.execute("SELECT version();")
        version = cur.fetchone()[0]
        conn.close()
        return {"status": "ok", "db_version": version}
    except Exception as e:
        return {"status": "error", "detail": str(e)}, 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
