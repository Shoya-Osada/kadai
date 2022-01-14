# coding: utf-8
 
# ①ライブラリのimport
import datetime
import decimal
import boto3
from boto3.dynamodb.conditions import Key, Attr
 
# ③DynamoDBオブジェクトを取得
dynamodb = boto3.resource('dynamodb')
 
# ④Lambdaのメイン関数
def hello(event, context):
    
    # ⑤テーブル名を指定
    table_name = "demo-sls-person"
 
    # ⑦DynamoDBテーブルのオブジェクトを取得
    dynamotable = dynamodb.Table(table_name).scan()
    
    print(dynamotable)
     
    
    item = dynamotable["Items"]

    response = {
    "statusCode": 200,
    "headers": {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials": "true"
    },
    "body": item
    }

    return item
    
    # return item

