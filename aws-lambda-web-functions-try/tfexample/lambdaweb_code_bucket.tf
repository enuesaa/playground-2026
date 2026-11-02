resource "aws_s3_bucket" "lambdaweb_code" {
  bucket = "${var.identifier}-lambdaweb-code"
}

resource "aws_s3_bucket_versioning" "lambdaweb_code" {
  bucket = aws_s3_bucket.lambdaweb_code.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "lambdaweb_code" {
  bucket = aws_s3_bucket.lambdaweb_code.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = ["s3:GetObject", "s3:GetObjectVersion"]
        Resource  = "${aws_s3_bucket.lambdaweb_code.arn}/*"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}
