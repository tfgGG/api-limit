const { User } = require('../model');
const EXPIRE_TIME = 60;
const jwt = require('jsonwebtoken');
const {jwtsecret} = require('../config').secret;
const bycrpt = require('bcrypt');

module.exports = {

    async me(req,res){
        
    },
    async login(req,res){

       const {email, password} = req.body
       const user  = await User.findOne({ where: {email:email} })

       //If email user not exists, register
       if(!user){
         const createuser = await User.create(req.body).catch(req.body)
         res.send({
             id: createuser.userId,
             email: createuser.email,
             message: "Register Success"
         })
       }
       else if(user.email == email && bycrpt.compare(user.password,password)){
            const token = jwt.sign(user.email,jwtsecret)
            res.send({
                email: user.email,
                token: token,
                message: "Login Success"
            })
       }else{
           res.send(400).json({
            error: "Authencation Error",
            message: 'Authentication failed! Please check the request'
          });
       }

    }
}