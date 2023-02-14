const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Service', {
    id :{
       type: DataTypes.INTEGER,
       allowNull: false,
       primaryKey: true
     },
     amount :{
        type: DataTypes.INTEGER,
        allowNull: false
     },
     addres:{
        type: DataTypes.STRING,
        allowNull: false

     }
 
   

  
  });
};