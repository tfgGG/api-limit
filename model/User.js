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
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
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
    User.prototype.comparePassword =  (password,hashpassword)=>{
        return bcrypt.compare(password, hashpassword)
    }
    return User
} 