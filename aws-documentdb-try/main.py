from pymongo import MongoClient
import sys

DB_URI='mongodb://user:pass@sample.node.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'

with MongoClient(DB_URI) as client:
    db = client.sample_database

    col = db.sample_collection
    col.insert_one({'hello':'Amazon DocumentDB'})

    x = col.find_one({'hello':'Amazon DocumentDB'})
    print(x)
