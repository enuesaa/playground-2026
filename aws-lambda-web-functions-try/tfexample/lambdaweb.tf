resource "aws_lambdaweb_function" "main" {
  function_name = var.identifier

  revision_config {
    build_config {
      code_config {
        s3_object {
          bucket     = aws_s3_object.code.bucket
          key        = aws_s3_object.code.key
          version_id = aws_s3_object.code.version_id
        }
      }
      runtime_config {
        runtime = "nodejs22.x"
      }
    }

    service_config {
      execution_role_arn = aws_iam_role.lambdaweb_execution.arn
      environment_variables = {
        AWS_LAMBDA_ENTRYPOINT = "server.js"
      }
    }
  }

  endpoint_config {
    endpoint_name        = "default"
    endpoint_type        = "HomeRegion"
    auth_type            = "ApplicationManaged"
    auto_deployment_mode = "LatestRevision"
  }
}
