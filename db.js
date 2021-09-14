const {Sequelize} = require("sequelize")


// const sequelize = new Sequelize(
//     process.env.DB_DBNAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'postgres'
//     }
// )
async function syncDb(sequelize, options){
    const { force, alter } = options
    try {
        if (force)
            await sequelize.sync({force: true})
        else if (alter)
            await sequelize.sync({alter: true})
        else
            await sequelize.sync()
    } catch (err){
        console.log(err)
    }
}


// module.exports = sequelize

// const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:d4e725d0cb6e4b5ea16d3669e63b1e36@localhost:5432/sugar-sidekick");

module.exports = {sequelize,
                    syncDb};