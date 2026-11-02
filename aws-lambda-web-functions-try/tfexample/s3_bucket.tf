resource "aws_s3_bucket" "main" {
  bucket = "${var.identifier}-lambdawebcode"
}

resource "aws_s3_bucket_versioning" "main" {
  bucket = aws_s3_bucket.main.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = ["s3:GetObject", "s3:GetObjectVersion"]
        Resource  = "${aws_s3_bucket.main.arn}/*"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_s3_object" "code" {
  bucket = aws_s3_bucket.main.id
  key    = "code.zip"
  source = "code.zip"
  etag   = filemd5("code.zip")
}
