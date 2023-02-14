const { DataTypes } = require('sequelize');
const Users = require('./Users');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Donation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // name: {
    //  type: DataTypes.STRING,
    //  allowNull : false
    // },
    // lastname: {
    //  type: DataTypes.STRING,
    //  allowNull: false
    // },
  });
};
