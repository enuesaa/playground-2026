resource "google_cloud_run_v2_service" "app" {
  name     = "${var.identifier}-service"
  project  = var.project_id
  location = var.region
  invoker_iam_disabled = true
  deletion_protection = false

  scaling {
    manual_instance_count = 0
    min_instance_count    = 0
  }

  template {
    containers {
      # image = "us-docker.pkg.dev/cloudrun/container/hello" # default
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.main.repository_id}/app:latest"

      env {
        name  = "DB_HOST"
        value = google_alloydb_instance.primary.ip_address
      }
      env {
        name = "DB_PASSWORD"
        value = var.alloydb_password # this is not good
      }
    }

    vpc_access {
      network_interfaces {
        network    = var.network_id
        subnetwork = var.subnet_name
      }
      egress = "PRIVATE_RANGES_ONLY"
    }
  }
}
