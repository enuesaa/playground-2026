module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "~> 9.1"

  project_id   = local.project_id
  network_name = "${local.identifier}-vpc"
  routing_mode = "REGIONAL"

  subnets = [
    {
      subnet_name           = "${local.identifier}-subnet"
      subnet_ip             = local.subnet_cidr
      subnet_region         = local.region
      subnet_private_access = "true"
    }
  ]
}

resource "google_compute_router" "router" {
  name    = "${local.identifier}-router"
  network = module.vpc.network_self_link
  region  = local.region
}
