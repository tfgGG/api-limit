module.exports = {

    async testmiddleware(req,res,next){
        console.log("This is a middleware")
        res.setHeader("X-RateLimit-Limit",20)
        next();
    }
}