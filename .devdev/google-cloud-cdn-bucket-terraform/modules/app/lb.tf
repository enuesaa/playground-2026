# https
resource "google_compute_url_map" "main" {
  name            = var.identifier
  default_service = google_compute_backend_bucket.main.id
}

resource "google_compute_target_https_proxy" "main" {
  name            = "${var.identifier}-https"
  url_map         = google_compute_url_map.main.id
  ssl_policy      = google_compute_ssl_policy.main.name
  certificate_map = "//certificatemanager.googleapis.com/${google_certificate_manager_certificate_map.main.id}"
}

resource "google_compute_ssl_policy" "main" {
  name            = "ssl-policy"
  profile         = "MODERN"
  min_tls_version = "TLS_1_2"
}

resource "google_compute_global_forwarding_rule" "https" {
  name                  = "${var.identifier}-https"
  target                = google_compute_target_https_proxy.main.id
  port_range            = "443"
  ip_address            = google_compute_global_address.main.id
  load_balancing_scheme = "EXTERNAL_MANAGED"
}

resource "google_compute_global_address" "main" {
  name = var.identifier
}

# http
# よく分からないが HTTP 用のLBを別に立てないとリダイレクト設定できなそう
resource "google_compute_url_map" "http" {
  name = "${var.identifier}-http"

  default_url_redirect {
    https_redirect = true
    strip_query    = false
  }
}

resource "google_compute_target_http_proxy" "main" {
  name    = "${var.identifier}-http"
  url_map = google_compute_url_map.http.id
}

resource "google_compute_global_forwarding_rule" "http" {
  name                  = "${var.identifier}-http"
  target                = google_compute_target_http_proxy.main.id
  port_range            = "80"
  ip_address            = google_compute_global_address.main.id
  load_balancing_scheme = "EXTERNAL_MANAGED"
}
