resource "aws_iam_role" "codepipeline" {
  name = "${var.identifier}-codepipeline"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "codepipeline.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "codepipeline_s3source" {
  name = "s3source"

  role = aws_iam_role.codepipeline.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = [
          "s3:GetObject",
          "s3:GetBucketVersioning",
          "s3:GetObjectVersion",
          "s3:ListBucket", # たぶん不要
        ]
        Effect   = "Allow"
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.source.bucket}", # 不要かも
          "arn:aws:s3:::${aws_s3_bucket.source.bucket}/*",
        ]
      },
    ]
  })
}

resource "aws_iam_role_policy" "codepipeline_artifact" {
  name = "artifact"

  role = aws_iam_role.codepipeline.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = [
          "s3:GetObject",
          "s3:PutObject",
        ]
        Effect   = "Allow"
        Resource = "arn:aws:s3:::${aws_s3_bucket.codepipeline_artifact.bucket}/*"
      },
    ]
  })
}

resource "aws_iam_role_policy" "codepipeline_codebuild" {
  name = "codebuild"

  role = aws_iam_role.codepipeline.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = [
          "codebuild:BatchGetBuilds",
          "codebuild:StartBuild",
          "codebuild:BatchGetBuildBatches",
          "codebuild:StartBuildBatch",
        ]
        Effect   = "Allow"
        Resource = aws_codebuild_project.main.arn
      },
    ]
  })
}
