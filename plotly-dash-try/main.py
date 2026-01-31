from dash import Dash, html, dcc, Input, Output
import plotly.express as px
import dash_bootstrap_components as dbc
from data import users_df, activity_df

# --- App ---
app = Dash(
    __name__,
    suppress_callback_exceptions=True,
    external_stylesheets=[dbc.themes.FLATLY]  # ← ここ重要
)

# --- Layout ---
app.layout = dbc.Container(
    [
        dcc.Location(id="url"),
        html.Div(id="page-content"),
    ],
    fluid=True,
    className="py-4"
)

# =========================
# Page: User List
# =========================
def user_list_page():
    return dbc.Container(
        [
            dbc.Row(
                dbc.Col(html.H2("User List"), width=12),
                className="mb-4",
            ),

            dbc.Row(
                [
                    dbc.Col(
                        dbc.Card(
                            dbc.CardBody(
                                [
                                    html.H5("Users", className="card-title"),
                                    dbc.ListGroup(
                                        [
                                            dbc.ListGroupItem(
                                                dcc.Link(
                                                    f"{row.name} ({row.email})",
                                                    href=f"/users/{row.user_id}",
                                                    style={"textDecoration": "none"},
                                                )
                                            )
                                            for _, row in users_df.iterrows()
                                        ]
                                    ),
                                ]
                            )
                        ),
                        width=6,
                    )
                ]
            ),
        ]
    )

# =========================
# Page: User Detail
# =========================
def user_detail_page(user_id: int):
    user_df = users_df[users_df["user_id"] == user_id]

    if user_df.empty:
        return dbc.Alert("User not found", color="danger")

    user = user_df.iloc[0]
    user_activity = activity_df[activity_df["user_id"] == user_id]

    fig = px.histogram(
        user_activity,
        x="action",
        title="User Activity",
    )
    fig.update_layout(margin=dict(l=20, r=20, t=40, b=20))

    return dbc.Container(
        [
            # Back link
            dbc.Row(
                dbc.Col(
                    dcc.Link("← Back to list", href="/"),
                    width=12
                ),
                className="mb-3",
            ),

            # Title
            dbc.Row(
                dbc.Col(html.H2(f"User Detail: {user.name}"), width=12),
                className="mb-4",
            ),

            # KPI cards
            dbc.Row(
                [
                    dbc.Col(
                        dbc.Card(
                            dbc.CardBody(
                                [
                                    html.H6("Email"),
                                    html.P(user.email, className="fw-bold"),
                                ]
                            )
                        ),
                        width=3,
                    ),
                    dbc.Col(
                        dbc.Card(
                            dbc.CardBody(
                                [
                                    html.H6("Country"),
                                    html.P(user.country, className="fw-bold"),
                                ]
                            )
                        ),
                        width=3,
                    ),
                    dbc.Col(
                        dbc.Card(
                            dbc.CardBody(
                                [
                                    html.H6("Total Actions"),
                                    html.H3(len(user_activity)),
                                ]
                            )
                        ),
                        width=3,
                    ),
                ],
                className="mb-4",
            ),

            # Chart
            dbc.Row(
                dbc.Col(
                    dbc.Card(
                        dbc.CardBody(
                            dcc.Graph(
                                figure=fig,
                                config={"displayModeBar": False},
                            )
                        )
                    ),
                    width=12,
                ),
                className="mb-4",
            ),

            # Activity table
            dbc.Row(
                dbc.Col(
                    dbc.Card(
                        dbc.CardBody(
                            [
                                html.H5("Activity Log"),
                                dbc.Table.from_dataframe(
                                    user_activity,
                                    striped=True,
                                    bordered=False,
                                    hover=True,
                                    size="sm",
                                ),
                            ]
                        )
                    ),
                    width=12,
                )
            ),
        ]
    )

# =========================
# Router
# =========================
@app.callback(
    Output("page-content", "children"),
    Input("url", "pathname"),
)
def render_page(pathname):
    if pathname == "/":
        return user_list_page()

    if pathname.startswith("/users/"):
        try:
            user_id = int(pathname.split("/")[-1])
            return user_detail_page(user_id)
        except ValueError:
            return dbc.Alert("Invalid user id", color="warning")

    return dbc.Alert("404 Not Found", color="secondary")

# --- Run ---
if __name__ == "__main__":
    app.run(debug=True)
