module "app" {
  source = "../modules/app"

  identifier       = var.identifier
  project_id       = var.project_id
  region           = var.region

  # vpc
  network_id        = module.vpc.network_id
  network_self_link = module.vpc.network_self_link     # なんかvpcの識別子(id)らしい
  subnet_name       = module.vpc.subnets_names[0]
  subnet_cidr       = var.subnet_cidr

  # db
  alloydb_password = var.alloydb_password
}
