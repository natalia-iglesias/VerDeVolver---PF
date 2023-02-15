const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Feedback', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT, // se recibe mas caracteres y le poemos poner por parentesis el numero que queriamos
    },
    rating: {
      // puntuacion
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 5,
      },
    },
  });
};

// como obtener el id del usuario registrado -> LocalStorage -> redux
// como pbtener el id de la entidad -> podriamos obtenerlo por paramans (path /detalle/:id)
