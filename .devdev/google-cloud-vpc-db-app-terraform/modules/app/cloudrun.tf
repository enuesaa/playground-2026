resource "google_cloud_run_v2_service" "app" {
  name     = "${var.identifier}-service"
  project  = var.project_id
  location = var.region

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello" # default
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
