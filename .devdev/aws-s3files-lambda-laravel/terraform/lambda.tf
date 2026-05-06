data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambdaapp"
  output_path = "${path.module}/lambdaapp.zip"
}

resource "aws_lambda_function" "main" {
  function_name = "${var.identifier}-lambda"
  role          = aws_iam_role.lambda.arn

  handler = "public/index.php"
  runtime = "provided.al2023"

  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256

  timeout = 30

  layers = [
    "arn:aws:lambda:ap-northeast-1:xxx:layer:php-83:16", # bref
  ]

  vpc_config {
    subnet_ids         = var.subnet_ids
    security_group_ids = [aws_security_group.lambda.id]
  }
}
