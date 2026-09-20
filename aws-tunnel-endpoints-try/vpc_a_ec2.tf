data "aws_ami" "al2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_iam_role" "vpc_a_ec2_ssm" {
  name = "vpc-a-target-ec2-ssm"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRole"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "vpc_a_ec2_ssm" {
  role       = aws_iam_role.vpc_a_ec2_ssm.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "vpc_a_ec2_ssm" {
  name = "vpc-a-target-ec2-ssm"
  role = aws_iam_role.vpc_a_ec2_ssm.name
}

resource "aws_security_group" "vpc_a_target_ec2" {
  name        = "vpc-a-target-ec2"
  description = "Target EC2"
  vpc_id      = module.vpc_a.vpc_id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.vpc_a_rgw.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "vpc_a_target" {
  ami                    = data.aws_ami.al2023.id
  instance_type          = "t3.micro"
  subnet_id              = module.vpc_a.private_subnets[0]
  vpc_security_group_ids = [aws_security_group.vpc_a_target_ec2.id]
  iam_instance_profile   = aws_iam_instance_profile.vpc_a_ec2_ssm.name

  ## NAT Gateway なくてこれ進まないので注意
  user_data = <<-EOF
    #!/bin/bash
    dnf install -y nginx
    systemctl enable --now nginx
  EOF

  tags = {
    Name = "vpc-a-target"
  }
}
