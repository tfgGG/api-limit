const FormController = require('./controller/FormController')
module.exports = (app)=> {

    app.get('/', (req, res) => res.send('Hello World!'))

    app.post('/form', FormController.add)
    app.get('/form', FormController.index)

}