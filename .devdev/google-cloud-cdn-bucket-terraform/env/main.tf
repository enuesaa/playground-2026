terraform {
  required_version = ">= 1.5"

  backend "gcs" {
    bucket = ""
    prefix = ""
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region

  default_labels = {
    terraform = "aaa"
  }
}
