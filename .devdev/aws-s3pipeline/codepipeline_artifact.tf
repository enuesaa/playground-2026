resource "aws_s3_bucket" "codepipeline_artifact" {
  bucket = "${var.identifier}-codepipeline-artifact"

  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "codepipeline_artifact" {
  bucket = aws_s3_bucket.codepipeline_artifact.bucket

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "codepipeline_artifact" {
  bucket = aws_s3_bucket.codepipeline_artifact.bucket

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
