const { Form } = require('../model');
const Sequelize = require('sequelize');
module.exports = {

    async index(req,res){
        const ques = await Form.findAll()
        res.send({data:ques})
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