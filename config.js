const path = require('path')
module.exports  = {
    db:{
        database:process.env.DATABASE_URL|| "test",
        protocal:'mysql',
        username:　process.env.DB_USER || "root",
        password:process.env.DB_PASS || "j4146335",
        options:{
            dialect:process.env.DIALECT || "mysql",
            host: process.env.HOST　|| 'localhost',
        }
    },
    authencation:{
        jwtSecret : process.env.JWT_SECRET || 'secret' 
    },
    cache:{
        database: process.env.REDIS_URL
    },
    secret:{
         jwtsecret: "thisisasecret"
    }
}