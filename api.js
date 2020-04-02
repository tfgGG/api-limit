const FormController = require('./controller/FormController')
const UserController = require("./controller/UserController")
module.exports = (app)=> {

    app.get('/', (req, res) => res.send('Hello World!'))

    app.post('/form', FormController.add)
    app.get('/form', FormController.index)

    app.post('/user',UserController.login)

}