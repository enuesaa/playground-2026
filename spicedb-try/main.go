package main

// see https://authzed.com/docs/spicedb/getting-started/protecting-a-blog

import (
	"context"
	"fmt"

	pb "github.com/authzed/authzed-go/proto/authzed/api/v1"
	"github.com/authzed/authzed-go/v1"
	"github.com/authzed/grpcutil"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	// "google.golang.org/grpc"
	// "google.golang.org/grpc/credentials/insecure"
)


// read は reader と writer ができる？ってことかな
const schema = `definition user {}
definition post {
	relation reader: user
	relation writer: user
	permission read = reader + writer
	permission write = writer
}`

const spicedbEndpoint = "localhost:50051"

func main() {
	// see https://authzed.com/docs/spicedb/getting-started/client-libraries
	client, err := authzed.NewClient(
		spicedbEndpoint,
		grpcutil.WithInsecureBearerToken("t_your_token_here_1234567deadbeef"),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		panic(err)
	}

	/* create schema */
	// request := &pb.WriteSchemaRequest{Schema: schema}
	// _, err = client.WriteSchema(context.Background(), request)
	// if err != nil {
	// 	panic(err)
	// }

	/* create relationship */
	// request := &pb.WriteRelationshipsRequest{
	// 	Updates: []*pb.RelationshipUpdate{
	// 		{
				// emilia は post=1 の writer である
	// 			Operation: pb.RelationshipUpdate_OPERATION_CREATE,
	// 			Relationship: &pb.Relationship{
	// 				Resource: &pb.ObjectReference{
	// 					ObjectType: "post",
	// 					ObjectId:   "1",
	// 				},
	// 				Relation: "writer",
	// 				Subject: &pb.SubjectReference{
	// 					Object: &pb.ObjectReference{
	// 						ObjectType: "user",
	// 						ObjectId:   "emilia",
	// 					},
	// 				},
	// 			},
	// 		},
	// 		{
				// beatrice は post=1 の reader である
	// 			Operation: pb.RelationshipUpdate_OPERATION_CREATE,
	// 			Relationship: &pb.Relationship{
	// 				Resource: &pb.ObjectReference{
	// 					ObjectType: "post",
	// 					ObjectId:   "1",
	// 				},
	// 				Relation: "reader",
	// 				Subject: &pb.SubjectReference{
	// 					Object: &pb.ObjectReference{
	// 						ObjectType: "user",
	// 						ObjectId:   "beatrice",
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// }
	// resp, err := client.WriteRelationships(context.Background(), request)
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println(resp.WrittenAt.Token)

	/* check permission */
	emilia := &pb.SubjectReference{
		Object: &pb.ObjectReference{
			ObjectType: "user",
			ObjectId:   "emilia",
		},
	}
	beatrice := &pb.SubjectReference{
		Object: &pb.ObjectReference{
			ObjectType: "user",
			ObjectId:   "beatrice",
		},
	}
	firstPost := &pb.ObjectReference{
		ObjectType: "post",
		ObjectId:   "1",
	}

	ctx := context.Background()
	// emilia が firstPost を read する権限があるかどうか？
	resp, err := client.CheckPermission(ctx, &pb.CheckPermissionRequest{
		Resource:   firstPost,
		Permission: "read",
		Subject:    emilia,
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", resp) // PERMISSIONSHIP_HAS_PERMISSION

	// emilia が firstPost を write する権限があるかどうか？
	resp, err = client.CheckPermission(ctx, &pb.CheckPermissionRequest{
		Resource:   firstPost,
		Permission: "write",
		Subject:    emilia,
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", resp) // PERMISSIONSHIP_HAS_PERMISSION

	// beatrice が firstPost を read する権限があるかどうか？
	resp, err = client.CheckPermission(ctx, &pb.CheckPermissionRequest{
		Resource:   firstPost,
		Permission: "read",
		Subject:    beatrice,
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", resp) // PERMISSIONSHIP_HAS_PERMISSION

	// beatrice が firstPost を write する権限があるかどうか？
	resp, err = client.CheckPermission(ctx, &pb.CheckPermissionRequest{
		Resource:   firstPost,
		Permission: "write",
		Subject:    beatrice,
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", resp) // PERMISSIONSHIP_NO_PERMISSION
}
