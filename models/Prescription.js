module.exports = (sequelize, DataTypes) => {
    
    
    const Script = sequelize.define("script", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
      
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiration: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Script
    }
    
    