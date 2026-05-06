resource "aws_iam_role" "eventbridge" {
  name = "${var.identifier}-eventbridge"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "events.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "eventbridge_codepipeline" {
  name = "codepipeline"

  role = aws_iam_role.eventbridge.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "codepipeline:StartPipelineExecution"
        Effect   = "Allow"
        Resource = aws_codepipeline.main.arn
      },
    ]
  })
}
