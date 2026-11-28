output "vpc_id" {
  value = aws_vpc.main.id
}

output "nat_subnet_ids" {
  value = { for key, subnet in aws_subnet.nat : key => subnet.id }
}

output "endpoint_subnet_ids" {
  value = { for key, subnet in aws_subnet.endpoint : key => subnet.id }
}

output "nat_eip_public_ips" {
  value = { for key, eip in aws_eip.nat : key => eip.public_ip }
}

output "nat_private_ips" {
  value = { for key, subnet in aws_subnet.nat : key => cidrhost(subnet.cidr_block, 10) }
}
