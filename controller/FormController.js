const { Form } = require('../model');
const Sequelize = require('sequelize');
module.exports = {

    async index(req,res){
        const ques = await Form.findAll()
        
        if(ques.length>1)
            res.status(429).send({'error': "Too many Request"})
        else
            res.send(ques)
    },
    async add(req,res){
        console.log(req.body)
        try{
            const form = await Form.create(req.body)
            const {formId} = form
            res.send({"id": formId}) 
        }
        catch{
            res.status(500).send({
                error:"An create Item error occur"
            })
        }
    }

}