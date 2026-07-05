module "cloud_nat" {
  source  = "terraform-google-modules/cloud-nat/google"
  version = "~> 5.0"

  project_id = var.project_id
  region     = var.region
  router     = google_compute_router.router.name
  network    = module.vpc.network_self_link
  name       = "${var.identifier}-nat"
}
