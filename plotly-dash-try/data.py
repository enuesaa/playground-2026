import pandas as pd

users_df = pd.DataFrame([
    {"user_id": 1, "name": "Alice", "email": "alice@example.com", "country": "JP"},
    {"user_id": 2, "name": "Bob", "email": "bob@example.com", "country": "US"},
    {"user_id": 3, "name": "Charlie", "email": "charlie@example.com", "country": "JP"},
])

activity_df = pd.DataFrame([
    {"user_id": 1, "date": "2024-01-01", "action": "login"},
    {"user_id": 1, "date": "2024-01-02", "action": "purchase"},
    {"user_id": 2, "date": "2024-01-01", "action": "login"},
    {"user_id": 3, "date": "2024-01-03", "action": "login"},
])
