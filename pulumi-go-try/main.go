package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v7/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucket, err := s3.NewBucketV2(ctx, "my-bucket", &s3.BucketV2Args{
			Bucket: pulumi.String("pulumi-go-try-lsiosopwla"),
		})
		if err != nil {
			return err
		}
		_, err = s3.NewBucketPublicAccessBlock(ctx, "my-bucket-pab", &s3.BucketPublicAccessBlockArgs{
			Bucket:                bucket.ID(),
			BlockPublicAcls:       pulumi.Bool(true),
			BlockPublicPolicy:     pulumi.Bool(true),
			IgnorePublicAcls:      pulumi.Bool(true),
			RestrictPublicBuckets: pulumi.Bool(true),
		})
		if err != nil {
			return err
		}
		ctx.Export("bucketName", bucket.Bucket)
		ctx.Export("bucketArn", bucket.Arn)

		return nil
	})
}