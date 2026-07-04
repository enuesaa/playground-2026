variable "identifier" {
  type = string
}

variable "project_id" {
  type = string
}

variable "region" {
  type = string
}

# vpc
variable "network_self_link" {
  type = string
}

variable "subnet_self_link" {
  type = string
}

variable "subnet_cidr" {
  type = string
}

# db
variable "alloydb_password" {
  type      = string
  sensitive = true
}
