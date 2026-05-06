resource "aws_s3_bucket" "source" {
  bucket = "${var.identifier}-source"

  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "source" {
  bucket = aws_s3_bucket.source.bucket

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "source" {
  bucket = aws_s3_bucket.source.bucket

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_notification" "source" {
  bucket      = aws_s3_bucket.source.id
  eventbridge = true
}

resource "aws_s3_bucket_versioning" "source" {
  bucket = aws_s3_bucket.source.id

  versioning_configuration {
    status = "Enabled"
  }
}
