resource "aws_security_group" "vpc_a_rgw" {
  name        = "vpc-a-rgw"
  description = "Resource Gateway"
  vpc_id      = module.vpc_a.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

