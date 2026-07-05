resource "google_compute_target_https_proxy" "main" {
  project          = var.project_id
  name             = "${var.identifier}-https"
  url_map          = google_compute_url_map.main.id
  ssl_certificates = [google_compute_managed_ssl_certificate.main.id]
}

resource "google_compute_global_forwarding_rule" "https" {
  project               = var.project_id
  name                  = "${var.identifier}-https"
  target                = google_compute_target_https_proxy.main.id
  port_range            = "443"
  ip_address            = google_compute_global_address.main.id
  load_balancing_scheme = "EXTERNAL"
}

resource "google_compute_managed_ssl_certificate" "main" {
  project = var.project_id
  name    = var.identifier

  managed {
    domains = [var.domain]
  }
}
