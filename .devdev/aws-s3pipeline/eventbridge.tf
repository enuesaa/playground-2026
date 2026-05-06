// see https://ky-yk-d.hatenablog.com/entry/2022/08/16/230000
resource "aws_cloudwatch_event_rule" "main" {
  name = "${var.identifier}-codepipeline-trigger"

  event_pattern = <<EOF
{
  "detail": {
    "bucket": {
      "name": ["${aws_s3_bucket.source.bucket}"]
    },
    "reason": ["PutObject", "CompleteMultipartUpload", "CopyObject"],
    "object": {
      "key": ["file.zip"]
    }
  },
  "detail-type": ["Object Created"],
  "source": ["aws.s3"]
}
EOF
}

resource "aws_cloudwatch_event_target" "main" {
  rule     = aws_cloudwatch_event_rule.main.name
  arn      = aws_codepipeline.main.arn
  role_arn = aws_iam_role.eventbridge.arn
}
