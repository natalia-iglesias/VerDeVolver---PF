const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    id :{
       type: DataTypes.UUID,
       allowNull: false,
       unique: true,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    password:{
        type: DataTypes.STRING, // jkbgqowbgq    ---> cliente --> "2kk@@@"
        allowNull:false,
        unique: true
    }
   
  });
};