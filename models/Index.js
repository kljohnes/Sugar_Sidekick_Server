// Grab db instance
const { sequelize, syncDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
const DefineUser = require('./User')
const DefineLog = require('./Log')
const DefineProfile = require('./Profile')
const DefineScript = require('./Prescription')

// Making models
const User = DefineUser(sequelize, DataTypes) // Defines the model
const Log = DefineLog(sequelize, DataTypes) // Defines the model
const Profile = DefineProfile(sequelize, DataTypes)
const Script = DefineScript(sequelize, DataTypes)

// Define Associations
User.hasMany(Log)
Log.belongsTo(User)

User.hasOne(Profile)
Profile.belongsTo(User,{
    onDelete: "CASCADE",
    foreignKey: {allowNull: false}
})

User.hasMany(Script)
Script.belongsTo(User)

// Sync
syncDb(sequelize, {alter:false})
    
    
   


module.exports = { User, Log, Profile, Script }