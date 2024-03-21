GET:
http://localhost:3001/collections
http://localhost:3001/collections/2

(pas sur que le tri c'est ce qui est voulu)

POST:
http://localhost:3001/collections
{
"name": "idk",
"number_tomes": 52,
"author": "nasas",
"price": 33,
"rating": 1
}

DELETE:
http://localhost:3001/collections/2

PATCH:
http://localhost:3001/collections/3
{
"name": "something",
"number_tomes": 2,
"author": "moi",
"price": 10,
"rating": 3
}
