resource "google_alloydb_cluster" "main" {
  cluster_id = "${var.identifier}-cluster"
  project    = var.project_id
  location   = var.region

  network_config {
    network = var.network_id
  }

  initial_user {
    user     = "postgres"
    password = var.alloydb_password
  }

  depends_on = [
    google_service_networking_connection.private_vpc_connection
  ]
}

resource "google_alloydb_instance" "primary" {
  cluster       = google_alloydb_cluster.main.name
  instance_id   = "${var.identifier}-primary"
  instance_type = "PRIMARY"

  machine_config {
    cpu_count = 2
  }
}
