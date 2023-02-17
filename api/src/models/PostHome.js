const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // RUTAS
  sequelize.define('PostHome', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // allownull: false , unique: true
      autoIncrement: true,
    },
    URL: {
      // Instagram
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Delivered', 'Pending'),
      defaultValue: 'Pending',
    },
  });
};
