resource "aws_cloudwatch_log_group" "codebuild" {
  name              = "${var.identifier}-codebuild"
  retention_in_days = 3
}
