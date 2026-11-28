
locals {
  azs = {
    a = {
      zone            = "ap-northeast-1a"
      nat_cidr        = "10.0.0.0/24"
      endpoint_cidr   = "10.0.10.0/24"
      client_cidr     = "10.0.20.0/24"
    }
    c = {
      zone            = "ap-northeast-1c"
      nat_cidr        = "10.0.1.0/24"
      endpoint_cidr   = "10.0.11.0/24"
      client_cidr     = "10.0.21.0/24"
    }
  }
  vpc_cidr = "10.0.0.0/16"
}

resource "aws_vpc" "main" {
  cidr_block           = local.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags                 = { Name = "nfw-test" }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "nfw-test" }
}

resource "aws_subnet" "nat" {
  for_each          = local.azs
  vpc_id            = aws_vpc.main.id
  availability_zone = each.value.zone
  cidr_block        = each.value.nat_cidr
  tags              = { Name = "nfw-nat-${each.key}" }
}

resource "aws_subnet" "endpoint" {
  for_each          = local.azs
  vpc_id            = aws_vpc.main.id
  availability_zone = each.value.zone
  cidr_block        = each.value.endpoint_cidr
  tags              = { Name = "nfw-endpoint-${each.key}" }
}

resource "aws_subnet" "client" {
  for_each          = local.azs
  vpc_id            = aws_vpc.main.id
  availability_zone = each.value.zone
  cidr_block        = each.value.client_cidr
  tags              = { Name = "nfw-client-${each.key}" }
}

resource "aws_route_table" "to_internet_gateway" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "nfw-to-igw" }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "nat" {
  for_each       = aws_subnet.nat
  subnet_id      = each.value.id
  route_table_id = aws_route_table.to_internet_gateway.id
}

resource "aws_route_table_association" "endpoint" {
  for_each       = aws_subnet.endpoint
  subnet_id      = each.value.id
  route_table_id = aws_route_table.to_internet_gateway.id
}

resource "aws_route_table" "client_local_only" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "nfw-client-local-only" }
}

resource "aws_route_table_association" "client" {
  for_each       = aws_subnet.client
  subnet_id      = each.value.id
  route_table_id = aws_route_table.client_local_only.id
}

resource "aws_eip" "nat" {
  for_each = local.azs
  domain   = "vpc"
  tags     = { Name = "nfw-nat-${each.key}" }
}
