# resource "google_compute_target_http_proxy" "main" {
#   project = var.project_id
#   name    = "${var.identifier}-http"
#   url_map = google_compute_url_map.redirect.id
# }

# resource "google_compute_global_forwarding_rule" "http" {
#   project               = var.project_id
#   name                  = "${var.identifier}-http"
#   target                = google_compute_target_http_proxy.default.id
#   port_range            = "80"
#   ip_address            = google_compute_global_address.default.id
#   load_balancing_scheme = "EXTERNAL"
# }

# resource "google_compute_url_map" "redirect" {
#   project = var.project_id
#   name    = "${var.identifier}-httpsredirect"

#   default_url_redirect {
#     https_redirect = true
#     strip_query    = false
#   }
# }
