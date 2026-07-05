# resource "google_compute_target_https_proxy" "main" {
#   project          = var.project_id
#   name             = "${var.identifier}-https"
#   url_map          = google_compute_url_map.main.id
#   ssl_policy = google_compute_ssl_policy.main.name
#   certificate_map = "//certificatemanager.googleapis.com/${google_certificate_manager_certificate_map.main.id}"
# }

# resource "google_compute_ssl_policy" "main" {
#   name            = "ssl-policy"
#   profile         = "MODERN"
#   min_tls_version = "TLS_1_2"
# }

# resource "google_compute_global_forwarding_rule" "https" {
#   project               = var.project_id
#   name                  = "${var.identifier}-https"
#   target                = google_compute_target_https_proxy.main.id
#   port_range            = "443"
#   ip_address            = google_compute_global_address.main.id
#   load_balancing_scheme = "EXTERNAL"
# }
