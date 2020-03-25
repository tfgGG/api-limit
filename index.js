const express = require('express');
const app = express()
var http = require('http');
const https = require('https');
const port = 3000;
const {sequelize} = require('./model')
const bodyParser = require('body-parser')
const middleware =  require('./middleware/LimitMiddleware')
const jwt = require('jsonwebtoken')
const redis = require("redis");
var client = null;

console.log(process.env.REDIS_URL)
if(process.env.REDIS_URL)
  client = redis.createClient(process.env.REDIS_URL)
else
  client = redis.createClient()

client.on('connect', function() {
    console.log('Redis connected');
    client.flushall();
});

app.use(bodyParser.json())
app.use(middleware.testmiddleware);

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))


require("./api")(app)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});


sequelize.sync({force: false})
    .then(()=>{
        console.log("Server start working")
})