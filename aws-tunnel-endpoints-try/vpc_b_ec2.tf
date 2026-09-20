resource "aws_iam_role" "vpc_b_ec2_ssm" {
  name = "vpc-b-ec2-ssm"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRole"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "vpc_b_ec2_ssm" {
  role       = aws_iam_role.vpc_b_ec2_ssm.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "vpc_b_ec2_ssm" {
  name = "vpc-b-ec2-ssm"
  role = aws_iam_role.vpc_b_ec2_ssm.name
}

resource "aws_security_group" "vpc_b_ec2" {
  name        = "vpc-b-ec2"
  description = "GENEVE relay EC2"
  vpc_id      = module.vpc_b.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "vpc_b_relay" {
  ami                    = data.aws_ami.al2023.id
  instance_type          = "t3.micro"
  subnet_id              = module.vpc_b.private_subnets[0]
  vpc_security_group_ids = [aws_security_group.vpc_b_ec2.id]
  iam_instance_profile   = aws_iam_instance_profile.vpc_b_ec2_ssm.name

  tags = {
    Name = "vpc-b-relay"
  }
}
