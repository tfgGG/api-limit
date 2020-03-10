module.exports = (sequelize,DataTypes)=> {
    const Form = sequelize.define('Form',{
        formId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:DataTypes.STRING,
        answer:DataTypes.INTEGER,
        discription: DataTypes.STRING
    },{
        hooks:{
            //beforeCreate:hashPass,
            //beforeUpdate:hashPass,
        }
    })
    return Form
}