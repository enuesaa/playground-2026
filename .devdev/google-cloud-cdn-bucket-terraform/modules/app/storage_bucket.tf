resource "google_storage_bucket" "main" {
  name          = "${var.identifier}-weborigin"
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

# see https://dev.classmethod.jp/articles/access-private-gcs-with-cloud-cdn-and-external-alb/
# 2026年7月に登場した Private Bucket Access という機能。
# ぱっと見 OAI に似ている。こうすればバケットのURLには直でアクセスできないし Cloud CDN のURL経由ではアクセスできる
# コンソールには「Load balancer proxy service account (all traffic)」って表示されていた
resource "google_storage_bucket_iam_member" "private_bucket_access" {
  bucket = google_storage_bucket.main.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:service-${data.google_project.main.number}@https-lb.iam.gserviceaccount.com"
}

data "google_project" "main" {
  project_id = var.project_id
}