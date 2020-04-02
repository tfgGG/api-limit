const bcrypt = require('bcrypt');

function hashPass(user,password){
    const SALT_FACTOR = 8

    if(!user.changed('password')){
        return;
    }
    
    return bcrypt.genSalt(SALT_FACTOR)
                .then(salt => bcrypt.hash(user.password,salt,null))
                .then(hash => {
                user.setDataValue('password',hash)
    });
}



module.exports = (sequelize,DataTypes)=> {
    const User = sequelize.define('User',{
        userId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        name:DataTypes.STRING,
        password:DataTypes.STRING,
        discription: DataTypes.STRING
    },{
        hooks:{
            beforeCreate:hashPass,
            beforeUpdate:hashPass,
        }
    })
    return User
} 