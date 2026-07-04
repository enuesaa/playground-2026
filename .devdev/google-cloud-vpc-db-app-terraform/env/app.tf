module "app" {
  source = "../modules/app"

  identifier       = local.identifier
  project_id       = local.project_id
  region           = local.region

  # vpc
  network_id        = module.vpc.network_id
  network_self_link = module.vpc.network_self_link     # なんかvpcの識別子(id)らしい
  subnet_name       = module.vpc.subnets_names[0]
  subnet_cidr       = local.subnet_cidr

  # db
  alloydb_password = local.alloydb_password
}
