/**
 * see https://github.com/tokio-rs/topcoat/blob/main/examples/tailwind/Cargo.toml
 */
fn main() {
    topcoat::tailwind::BuildConfig::new().render().unwrap();
}
