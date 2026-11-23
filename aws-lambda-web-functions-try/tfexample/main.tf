terraform {
  required_version = "1.16.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.73.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.7.0"
    }
  }
}
