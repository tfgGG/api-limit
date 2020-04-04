
An api implemention for basic token authencation and api limit rules. Build up with Redis and MySQL, using ORM Sequelize for data mapping.



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

Limit rule is set according client ips, when client reaches the maximun number of request, will return response with custom header `X-RateLimit-Remainng`
`X-RateLimit-Reset`

> Note that for testing efficentcy, rule is set to 10 request/min for every client

API
---

- Every api endpoints needs request header `token` 
- DomainUrl: https://api-limit-staging.herokuapp.com/


#### POST /login
example body
```
{
    "email":"test@email",
    "password":"password123",
    "name": "testname",
    "description":"testdescription" ,
}
```