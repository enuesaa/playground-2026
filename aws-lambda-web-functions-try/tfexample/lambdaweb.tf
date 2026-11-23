resource "aws_lambdaweb_function" "main" {
  function_name = var.identifier
}

resource "aws_lambdaweb_function_endpoint" "main" {
  function_name = aws_lambdaweb_function.main.function_name
  endpoint_name = "default"
  endpoint_type = "HomeRegion"
  auth_type     = "ApplicationManaged"

  depends_on = [aws_lambdaweb_function_revision.main]
}
