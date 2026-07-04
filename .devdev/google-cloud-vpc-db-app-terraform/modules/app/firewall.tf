resource "google_compute_firewall" "allow_alloydb" {
  name    = "${var.identifier}-allow-alloydb"
  network = var.network_id
  project = var.project_id

  allow {
    protocol = "tcp"
    ports    = ["5432"]
  }

  source_ranges = [var.subnet_cidr]
}

resource "google_compute_firewall" "allow_iap_ssh" {
  name    = "${var.identifier}-allow-iap-ssh"
  network = var.network_id
  project = var.project_id

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  target_tags = ["allow-iap-ssh"]
  source_ranges = ["35.235.240.0/20"] # IAP. see https://blog.g-gen.co.jp/entry/login-your-vm-with-iap
}
