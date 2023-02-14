const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'VdV',
    {
      id: {
        // MAIL
        primaryKey: true,
        type: DataTypes.STRING, // buscar regex
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [5, 400],
        // },
      },
      address: {
        // Ver que necesita maps para que almacenemos aca
        type: DataTypes.STRING,
        // allowNull: false,
      },
      CBU: {
        type: DataTypes.STRING,
        unique: true,
        // validate: {
        //   len: [22, 22], // buscar regex
        // },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 20],
        },
      },
    },
    { timestamp: false }
  );
};
