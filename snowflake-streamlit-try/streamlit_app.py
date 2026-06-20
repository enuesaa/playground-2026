from snowflake.snowpark.context import get_active_session
import streamlit as st
import pandas as pd

st.set_page_config(
    page_title="Notes Dashboard",
    layout="wide",
)

st.title("📝 Notes Dashboard")

session = get_active_session()

TABLE = 'DEST_DB."public"."notes"'


@st.cache_data(ttl=30)
def load_notes():
    return session.sql(f"""
        SELECT *
        FROM {TABLE}
        ORDER BY CREATED_AT DESC
    """).to_pandas()


pdf = load_notes()

if pdf.empty:
    st.info("No data found.")
    st.stop()

pdf.columns = [c.upper() for c in pdf.columns]

if "CREATED_AT" in pdf.columns:
    pdf["CREATED_AT"] = pd.to_datetime(pdf["CREATED_AT"])

# -----------------------------
# Metrics
# -----------------------------

col1, col2 = st.columns(2)

col1.metric(
    "レコード数",
    len(pdf)
)

today = pd.Timestamp.now().date()

today_count = (
    pdf["CREATED_AT"].dt.date == today
).sum()

col2.metric(
    "今日のレコード数",
    int(today_count)
)

st.divider()

# -----------------------------
# Table
# -----------------------------

st.dataframe(
    pdf,
    use_container_width=True,
    hide_index=True,
)
