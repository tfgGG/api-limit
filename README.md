


An api implemention demonstrating for basic token authencation and api limit rules. Build up with Redis and MySQL, using ORM Sequelize for data mapping.

Initial project
```
npm install
```
 Run project, note that database will be reset when boosting
```
npm start 
```


Rate Limit 
---

Limit rule is set according to different client ips, when api endpoint is called, will return response with custom header `X-RateLimit-Remainng`, meaning the request amount left, or `X-RateLimit-Reset`, if client has reaches the maximun amount of api request, along with ```{ "error" : "Too many request"}``` response body

> Note that for testing efficentcy, rule is set to 10 request/min for every client

API
---

- Every api endpoints needs request header `token`, except POST /login 
- DomainUrl: https://api-limit-staging.herokuapp.com/


#### POST /login
example request body
```
{
    "email":"test@email",
    "password":"password123",
    "name": "testname",
    "description":"testdescription" ,
}
```
if email already exist, responsing token to login
```
{
    "id": "9292a040-769c-11ea-a867-4bd24131117b",
    "email": "test@email.com",
    "token": "eyJhbGciOiJIUzI1NiJ9.dGVzdEBlbWFpbC5jb20.p7_owFiCpFDqsaq7r5w2FruZAUZuaHmsyhVUMpfcwJc",
    "message": "Login Success"
}
```

if email not exist, will register and update to db
```
{
    "id": "9292a040-769c-11ea-a867-4bd24131117b",
    "email": "test@email.com",
    "message": "Register Success"
}
```

#### GET /user/:id
Will return user info belongs to the id, ==token should belongs to the user that generates from==
```
{
    "userId": "9292a040-769c-11ea-a867-4bd24131117b",
    "email": "test@email.com",
    "name": "testname",
    "password": "$2b$08$zFUkZseyhG5BXDctgBrtq..QPXA1rUXtjorXL/x8d2VjQ8KJlt0nm",
    "discription": "testdescription",
    "createdAt": "2020-04-04T17:49:03.429Z",
    "updatedAt": "2020-04-04T17:49:03.429Z"
}
```

#### Patch /user/:id
Changing password, ==token should belongs to the user that generates from==
example body
```
{
    "password": "passwordchange123"
}
```


#### POST /form
a sample form object 
```
{
	"name":"testform",
	"discription":"testdiscription",
	"answer":1
}
```

#### GET /form
get all form objects returning array
