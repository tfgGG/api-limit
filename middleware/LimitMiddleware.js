
const redis = require("redis");
const client = redis.createClient();
const MAX_REQEST = 10;
const TIME_LIMIT = 60; 
module.exports = {

    async testmiddleware(req,res,next){
        console.log("This is a middleware")
        var ip = "";
        if(req.header("X-Forwarded-For") == null)
            ip =  req.connection.remoteAddress
        else
            ip  = req.getHeader("X-Forwarded-For").toString();

        console.log(ip);
        client.hgetall(ip.toString(),(err,data)=>{
         
            if(data == null){
                console.log("inside NUll")
                client.hset(ip.toString(),"time", Math.floor(new Date()/1000),redis.print());
                client.hset(ip.toString(),"count", 1 ,redis.print());
                client.expire(ip.toString(),TIME_LIMIT);
                res.setHeader("X-RateLimit-Limit", MAX_REQEST - 1 );
            }
            else if(data['count'] < 10){
                res.setHeader("X-RateLimit-Limit", MAX_REQEST-data['count']-1)
                client.hincrby(ip.toString(),"count",1,redis.print());
            }else{
                res.setHeader('X-RateLimit-Reset',data['time']);
            }
            console.log(data);
        })
        next();
    }
}