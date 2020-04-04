const { User } = require('../model');
const EXPIRE_TIME = 60;
const jwt = require('jsonwebtoken');
const {jwtsecret} = require('../config').secret;
const bycrpt = require('bcrypt');

module.exports = {
    
    async me(req,res){
        const user = await User.findOne({where: {userId: req.params.id}})
        if(user && req.decoded == user.email)
            res.send(user)
        else{
            res.status(400).send({
                error: "Authencation Error",
                message: 'Authentication failed! Wrong token '
            });
        }
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
       const isvalid = await user.comparePassword(password,user.password).catch((err)=>{})
       if(isvalid ){
            const token = jwt.sign(user.email,jwtsecret)
            res.send({
                id: user.userId,
                email: user.email,
                token: token,
                message: "Login Success"
            })
       }else{
           res.status(400).send({
            error: "Authencation Error",
            message: 'Authentication failed! Please check the request'
          });
       }
    },
    async changePass(req,res){
        
        if(Object.keys(req.body).length != 1 || Object.keys(req.body)[0]!= 'password'){
            res.status(400).send({
                message: 'Wrong Field'
            })
        }
        
        const user = await User.findOne({where:{userId:req.params.id}});
        if(!user)
            res.status(400).send({ message: 'Data not Exist'})
        else if(user && req.decoded == user.email){
            user.setDataValue('password',req.body.password);
            await user.save();
            res.send({message: "Password has been modified"});
        }else{
            res.status(400).send({
                error: "Authencation Error",
                message: 'Authentication failed! Wrong token '
            });
        }
        
    }
}