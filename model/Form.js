module.exports = (sequelize,DataTypes)=> {
    const Form = sequelize.define('Form',{
        formId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name:DataTypes.STRING,
        answer:DataTypes.INTEGER,
        discription: DataTypes.STRING
    })
    return Form
}