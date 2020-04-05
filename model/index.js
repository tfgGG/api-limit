const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize')
const redis = require("redis");
const config = require('../config'); 
const db ={};

if(process.env.DATABASE_URL != null)
{
    console.log("Using Postgres")
    this.sequelize = new Sequelize(
        process.env.DATABASE_URL,
        {
            dialect:'postgres',
            protocol:'postgres',
            dialectOptions:{
                ssl : true
            }
        }
    ) 
}else{
    console.log("Using Local Database MySQL")
    this.sequelize = new Sequelize(
        config.db.database,
        config.db.username,
        config.db.password,
        config.db.options
    )
}

if(process.env.REDIS_URL)
  this.client = redis.createClient(process.env.REDIS_URL)
else
  this.client = redis.createClient()



// Read all model file(except index.js) and load into sequelize
fs.readdirSync(__dirname).filter( (file)=> file!=='index.js'&& file!=="question.json" && file!=="item.json")
.forEach( (file)=>{
    const model = this.sequelize.import(path.join(__dirname,file)) 
    db[model.name]=model 
})

db.sequelize = this.sequelize
db.Sequelize = Sequelize
db.client = this.client

module.exports = db