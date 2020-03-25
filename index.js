const express = require('express');
const app = express()
var http = require('http');
const https = require('https');
const port = 3000;
const {sequelize} = require('./model')
const {client} = require('./model')
const bodyParser = require('body-parser')
const middleware =  require('./middleware/LimitMiddleware')
const jwt = require('jsonwebtoken')



app.use(bodyParser.json())
app.use(middleware.testmiddleware);

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))


require("./api")(app)

client.on('connect', function() {
  console.log('Redis connected');
  client.flushall();
});


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
