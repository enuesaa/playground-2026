module "vpc_b" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "vpc-b"
  cidr = "10.1.0.0/16"

  azs             = ["ap-northeast-1a", "ap-northeast-1c"]
  private_subnets = ["10.1.0.0/24", "10.1.1.0/24"]

  enable_nat_gateway   = false
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_security_group" "vpc_b_ssm_endpoints" {
  name        = "vpc-b-ssm-endpoints"
  description = "SSM endpoints"
  vpc_id      = module.vpc_b.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [module.vpc_b.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_vpc_endpoint" "vpc_b_ssm" {
  vpc_id              = module.vpc_b.vpc_id
  service_name        = "com.amazonaws.ap-northeast-1.ssm"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = module.vpc_b.private_subnets
  security_group_ids  = [aws_security_group.vpc_b_ssm_endpoints.id]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "vpc_b_ssmmessages" {
  vpc_id              = module.vpc_b.vpc_id
  service_name        = "com.amazonaws.ap-northeast-1.ssmmessages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = module.vpc_b.private_subnets
  security_group_ids  = [aws_security_group.vpc_b_ssm_endpoints.id]
  private_dns_enabled = true
}
