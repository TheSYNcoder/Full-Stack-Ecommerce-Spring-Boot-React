import pandas as pd
import json
import random
men_content = json.loads(open('men-data.json','r').read())
f_content = json.loads(open('female-data.json','r').read())


obj = {
    'a_sex':[],
    'dresstype':[],
    'image':[],
    'price':[],
    'arrival':[],
    'discount':[]
}
df = pd.DataFrame(obj)

def sanitizePrice(price):
    price = price[3:].replace(',','')
    return int(price)


for content in men_content:
    temp = pd.DataFrame( { 'a_sex' : ['MALE'] ,
    'dresstype' :[content['dressType']],
    'image'  : [content['image']],
    'price' : [content['price']],
    'arrival':[content['arrival']],
    'discount': [content['price']]
    })
    temp.iloc[0]['discount'] = random.randint( 100, min( 1500, sanitizePrice(content['price'])))

    df = df.append(temp, ignore_index = True)


for content in f_content:
    temp = pd.DataFrame( { 'a_sex' : ['FEMALE'] ,
    'dresstype' :[content['dressType']],
    'image'  : [content['image']],
    'price' : [content['price']],
    'arrival':[content['arrival']],
    'discount': [content['price']]
    })
    temp.iloc[0]['discount'] = random.randint(
        100, min(1500, sanitizePrice(content['price'])))

    df = df.append(temp, ignore_index = True)

df.to_csv('data2.csv')


