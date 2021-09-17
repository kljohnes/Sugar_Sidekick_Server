require('dotenv').config()
const express = require("express");
const app = express();
// const dbConnection = require('./db')
const port = 3000

const cors = require('cors');
app.use(require('./middleware/headers'));
app.use(cors());

;(async() => {
    app.use(express.json())
  
    const auth = require('./controllers/Auth')
    app.use("/auth", auth)
  
    const log = require('./controllers/Log')
    app.use('/log', log)

    const profile = require('./controllers/Profile')
    app.use('/profile', profile)

    const script = require('./controllers/Prescription')
    app.use('/script', script)
  
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
    })
  })()


// const controllers = require('./controllers');

// app.use(Express.json())

// app.use('/log', controllers.logController);
// app.use("/user", controllers.userController)

// dbConnection.authenticate()
//     .then(() => dbConnection.sync())
//     .then(() => {
//         app.listen(3000, () => {
//             console.log(`[Server]: App is listening on 3000.`)
//         });
//     })
//     .catch((err) => {
//         console.log(`[Server]: Server crashed. Error = ${err}`);
//     })