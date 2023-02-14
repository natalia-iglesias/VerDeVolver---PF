const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Donations', {
    id :{
       type: DataTypes.INTEGER,
       allowNull: false,
       unique: true,
       primaryKey: true
     },
   name: {
    type: DataTypes.STRING,
    allowNull : false
   },
   lastname: {
    type: DataTypes.STRING,
    allowNull: false
   },
   amount:{
    type: DataTypes.INTEGER,
    allowNull: false

   },
  
  });
};