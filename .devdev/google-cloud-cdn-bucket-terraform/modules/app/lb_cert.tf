# これは Managed SSL というあんまり良くない発行の仕方らしい。切り替えの時にダウンタイムが発生しうる
# see https://zenn.dev/glassonion1/articles/2824399b7759d8
# resource "google_compute_managed_ssl_certificate" "main" {
#   project = var.project_id
#   name    = var.identifier
#   managed {
#     domains = [var.domain]
#   }
# }

# 証明書
# ルート証明書は Google Trust Services の WR3 ってところだった。https://pki.goog/repository/
resource "google_certificate_manager_certificate" "main" {
  name = var.identifier

  managed {
    domains = [google_certificate_manager_dns_authorization.main.domain]
    dns_authorizations = [google_certificate_manager_dns_authorization.main.id]
  }
}

# これ検証まで時間かかる。数分
resource "google_certificate_manager_dns_authorization" "main" {
  name   = var.identifier
  domain = var.domain
}

# 証明書マップ
resource "google_certificate_manager_certificate_map" "main" {
  name = var.identifier
}

resource "google_certificate_manager_certificate_map_entry" "main" {
  name = var.identifier
  map  = google_certificate_manager_certificate_map.main.name
  hostname = google_certificate_manager_dns_authorization.main.domain
  certificates = [google_certificate_manager_certificate.main.id]
}
