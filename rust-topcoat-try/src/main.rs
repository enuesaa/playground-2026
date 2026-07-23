use serde::{Deserialize, Serialize};
use topcoat::{
    Result, asset::{AssetBundle, RouterBuilderAssetExt}, router::{Json, Router, RouterBuilderDiscoverExt, layout, page, route}, tailwind, view::{component, view},
};

#[tokio::main]
async fn main() {
    let router = Router::builder()
        .layout(root_layout)
        .assets(AssetBundle::load().unwrap())
        .discover()
        .build();
    topcoat::start(router).await.unwrap();
}

#[layout("/")]
async fn root_layout(slot: Result) -> Result {
    // レイアウト
    // slot がある
    view! {
        <!DOCTYPE html>
        <html>
            <head>
                topcoat::dev::script()
                <link rel="stylesheet" href=(tailwind::stylesheet!())>
            </head>
            <body>(slot?)</body>
        </html>
    }
}

#[page("/")]
async fn home() -> Result {
    view! {
        <main>
            page_title(title: "PageTitle here.")
        </main>
    }
}

#[component]
async fn page_title(title: &str) -> Result {
    view! { <h1 class="text-2xl font-bold text-[#ff6633]">(title)</h1> }
}

#[derive(Deserialize, Serialize)]
struct Note {
    title: String,
}

#[route(POST "/api/notes")]
async fn create_note(Json(note): Json<Note>) -> Result<Json<Note>> {
    Ok(Json(note))
}
