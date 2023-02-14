const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('VdV', {
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
      
    },
    img:{
        type: DataTypes.STRING,
        

    },
    description:{
        type: DataTypes.STRING,
        allowNull:false,
       
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    CBU:{
        type: DataTypes.INTEGER,
        unique: true
    },
   
  });
};