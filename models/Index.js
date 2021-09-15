// Grab db instance
const { sequelize, syncDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefineLog = require('./Log')
const DefineProfile = require('./Profile')

const User = DefineUser(sequelize, DataTypes) // Defines the model
const Log = DefineLog(sequelize, DataTypes) // Defines the model
const Profile = DefineProfile(sequelize, DataTypes)

// Define Associations
User.hasMany(Log)
Log.belongsTo(User)

User.hasOne(Profile)
Profile.belongsTo(User,{
    onDelete: "CASCADE",
    foreignKey: {allowNull: false}
})

// Sync
syncDb(sequelize, {alter:true})
    
    
   


module.exports = { User, Log, Profile }