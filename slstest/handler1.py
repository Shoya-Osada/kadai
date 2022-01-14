import boto3
import json
dynamoDB = boto3.resource('dynamodb')
table= dynamoDB.Table('demo-sls-person')

def insert(event,context):
    
    table.put_item(
        
         Item = {
            'id': event['body']['id'],
            'date': event['body']['date'],
            'time': event['body']['time'],
            'type': event['body']['type'],
            'number': event['body']['number'],
            'count':event['body']['count']
         },
    )
    print("PutItem succeeded:")

    

    return 

def hello(event,context):
    
    print(json.dumps(event))
    
    insert(event,context)
    
    return {
        'statusCode': 200
    }
