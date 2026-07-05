module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "~> 9.1"

  project_id   = var.project_id
  network_name = "${var.identifier}-vpc"
  routing_mode = "REGIONAL"

  subnets = [
    {
      subnet_name           = "${var.identifier}-subnet"
      subnet_ip             = var.subnet_cidr
      subnet_region         = var.region
      subnet_private_access = "true"
    }
  ]
}

resource "google_compute_router" "router" {
  name    = "${var.identifier}-router"
  network = module.vpc.network_self_link
  region  = var.region
}
