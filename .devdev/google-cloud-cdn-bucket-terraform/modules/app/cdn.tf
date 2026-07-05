# resource "google_compute_backend_bucket" "main" {
#   project     = var.project_id
#   name        = var.identifier
#   bucket_name = google_storage_bucket.main.name
#   enable_cdn  = true

#   cdn_policy {
#     cache_mode  = "CACHE_ALL_STATIC"
#     default_ttl = 3600
#     client_ttl  = 3600
#     max_ttl     = 86400
#   }
# }

# resource "google_compute_url_map" "main" {
#   project         = var.project_id
#   name            = var.identifier
#   default_service = google_compute_backend_bucket.default.id
# }

# resource "google_compute_global_address" "main" {
#   project = var.project_id
#   name    = var.identifier
# }
