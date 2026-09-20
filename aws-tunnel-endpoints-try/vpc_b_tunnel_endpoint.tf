resource "aws_security_group" "vpc_b_tunnel_endpoint" {
  name        = "vpc-b-tunnel-endpoint"
  description = "Tunnel Endpoint"
  vpc_id      = module.vpc_b.vpc_id

  ingress {
    from_port   = 6081
    to_port     = 6081
    protocol    = "udp"
    cidr_blocks = [module.vpc_b.vpc_cidr_block]
  }
}
