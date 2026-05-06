resource "aws_security_group" "s3files" {
  name        = "${var.identifier}-s3files"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr_block]
  }
}
