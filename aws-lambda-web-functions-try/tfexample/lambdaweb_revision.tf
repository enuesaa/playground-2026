resource "aws_lambdaweb_function_revision" "main" {
  function_name = aws_lambdaweb_function.main.function_name

  build_config {
    code_config {
      s3_object {
        bucket     = aws_s3_object.code.bucket
        key        = aws_s3_object.code.key
        version_id = aws_s3_object.code.version_id
      }
    }
    runtime_config {
      runtime = "nodejs26.x"
    }
  }

  service_config {
    execution_role_arn = aws_iam_role.lambdaweb_execution.arn
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "archive_file" "code" {
  type        = "zip"
  source_dir  = "lambdaweb"
  output_path = "code.zip"
}

resource "aws_s3_object" "code" {
  bucket = aws_s3_bucket_versioning.lambdaweb_code.bucket
  key    = "code.zip"
  source = archive_file.code.output_path
  etag   = archive_file.code.output_md5
}
