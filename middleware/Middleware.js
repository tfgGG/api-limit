
const MAX_REQEST = 10;
const TIME_LIMIT = 60; 
const {client} = require('../model')
const redis = require('redis');
const jwt = require('jsonwebtoken');
const {jwtsecret} =require('../config').secret;

module.exports = {
    testmiddleware(req,res,next){
        console.log("This is a middleware");
        var ip = "";
        if(req.header("X-Forwarded-For") == null)
            ip =  req.connection.remoteAddress
        else
            ip  = req.header("X-Forwarded-For").toString();
        
        client.hgetall(ip.toString(),(err,data)=>{
         
            if(data == null){
                console.log("Created ip:"+ip +" "+  new Date().toUTCString());
                client.hset(ip.toString(),"time", Date.now(),redis.print());
                client.hset(ip.toString(),"count", 1 ,redis.print());
                client.expire(ip.toString(),TIME_LIMIT);
                res.setHeader("X-RateLimit-Limit", MAX_REQEST - 1 );
                next();
            }
            else if(data['count'] < 10){
                res.setHeader("X-RateLimit-Limit", MAX_REQEST-data['count']-1)
                client.hincrby(ip.toString(),"count",1,redis.print());
                next();
            }else{
                res.setHeader('X-RateLimit-Reset', new Date(parseInt(data['time'])+ TIME_LIMIT*1000).toUTCString() );
                res.status(429).send({'error': "Too many Request"})
            }
            console.log(data);
            
        })
        
    },
    authmiddleware(req,res,next){
        
        var token = req.headers['x-access-token'] || req.headers['token']; 
        console.log(req.originalUrl,req.method)

        if(req.method==="POST" && req.originalUrl==="/user"){
            console.log(req.originalUrl,req.method)
            next();
        }
        else if(token){
            jwt.verify(token, jwtsecret, (err, decoded) => {
                if (err) {
                  res.send({message: 'Token is not valid'});
                } else {
                  req.decoded = decoded;
                  next();
                }
            });
        }
        else
            res.send({ message: 'Auth token is not supplied'})
        
    }
}