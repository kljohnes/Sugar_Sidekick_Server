module.exports = (sequelize, DataTypes) => {

    const Profile = sequelize.define("profile", {
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        diaversary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dark_mode: {
            type: DataTypes.BOOLEAN
        },
       
    })
    return Profile
    }