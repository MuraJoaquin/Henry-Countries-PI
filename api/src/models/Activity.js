const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    difficulty:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min:{
                args: 1,
                msg: "The difficulty must be between 1 and 5"
            },
            max:{   
                args: 5,
                msg: "The difficulty must be between 1 and 5"
            }
        }

    },
    duration:{
        type: DataTypes.TIME,
    },
    season:{
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
        allowNull: false,
    }
  } ,{timestamps:false})
  

};