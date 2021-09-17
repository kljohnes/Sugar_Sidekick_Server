module.exports = (sequelize, DataTypes) => {
//     const { DataTypes } = require("sequelize");
// const db = require("../db")

const User = sequelize.define("user", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        default: ("user")
    }
})
return User
}

// module.exports = User;