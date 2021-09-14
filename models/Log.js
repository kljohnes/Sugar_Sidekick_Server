

module.exports = (sequelize, DataTypes) => {
// const db = require("../db");

const Log = sequelize.define("log", {
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blood_glucose: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carbs: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    bolus: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    correction_dose: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    long_acting_dose: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
   owner: {
        type: DataTypes.INTEGER
    }
});
return Log
}


// module.exports = Log