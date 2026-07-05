resource "google_storage_bucket" "main" {
  name          = "${var.identifier}-weborigin"
  project       = var.project_id
  location      = var.region
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  uniform_bucket_level_access = true
}

# resource "google_storage_bucket_iam_member" "main" {
#   bucket = google_storage_bucket.main.name
#   role   = "roles/storage.objectViewer"
#   member = "allUsers"
# }
