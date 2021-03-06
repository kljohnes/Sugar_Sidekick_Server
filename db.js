require('dotenv').config()


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

const sequelize = new Sequelize(process.env.DATABASE_URL,
    process.env.ENVIRONMENT === "local" ? {dialect: 'postgres'} : 
     {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = {sequelize,
                    syncDb};