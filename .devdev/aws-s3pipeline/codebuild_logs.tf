resource "aws_cloudwatch_log_group" "codebuild" {
  name = "/aws/codebuild/${var.identifier}"

  retention_in_days = 30
}
