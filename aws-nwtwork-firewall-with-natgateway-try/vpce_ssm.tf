resource "aws_security_group" "ssm_endpoint" {
  name   = "nfw-ssm-endpoint"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [local.vpc_cidr]
  }
}

resource "aws_vpc_endpoint" "ssm" {
  for_each            = toset(["ssm", "ssmmessages", "ec2messages"])
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.ap-northeast-1.${each.key}"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  subnet_ids          = [for subnet in aws_subnet.client : subnet.id]
  security_group_ids  = [aws_security_group.ssm_endpoint.id]
}
