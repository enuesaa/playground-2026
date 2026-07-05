module "app" {
  source = "../modules/app"

  identifier       = var.identifier
  project_id       = var.project_id
  region           = var.region

  # cdn
  domain = var.domain
}
