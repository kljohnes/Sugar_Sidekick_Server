const { UniqueConstraintError } = require("sequelize/lib/errors")
let express = require("express")
let router = express.Router()
const { User } = require('../models/Index')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require('dotenv').config()
let validateJWT = require("../middleware/validate-jwt")
let validateAdmin = require("../middleware/validate-admin")

// POST  http://localhost:3000/auth/register -- Register User
router.post("/register", async (req, res) => {
    let { email, password, role } = req.body.user;
    try {
        const user = await User.create({
            email,
            password: bcrypt.hashSync(password, 13),
            role
        });

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: "User successfully registered.",
            user: user,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            })
        }
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
        const loginUser = await User.findOne({
            where: {
                email: email,

            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {

                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in.",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Login failed."
        })
    }
});

//UPDATE A USER

router.put('/', validateJWT, (req, res) => {
    const { email } = req.body.user
    let userId = req.user.id;
    const updateUser = {
        email,
        password: bcrypt.hashSync(req.body.user.password, 13)    }

    const query = { where: {id: userId}}
    User.update(updateUser, query)
    .then((user) => res.status(201).json({ message: `${user} successfully updated`}))
    .catch((err) => res.status(500).json({ error: err}))
})

//ADMIN ONLY - GET ALL USERS
// GET   http://localhost:3000/auth/all

router.get("/all", validateAdmin, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//ADMIN ONLY - UPDATE A USER, INCLUDING ROLE
router.put('/:id', validateAdmin, (req, res) => {
    const { email, role } = req.body.user
    const userId = req.params.id
    const updateUser = {
        email,
        role,
        password: bcrypt.hashSync(req.body.user.password, 13)    }

    const query = { where: {id: userId}}
    User.update(updateUser, query)
    .then((user) => res.status(201).json({ message: `${user} successfully updated`}))
    .catch((err) => res.status(500).json({ error: err}))
})

//ADMIN ONLY - DELETE A USER
router.delete('/:id', validateAdmin, (req, res) => {
    const userId = req.params.id
    const query = { where: {id: userId}}
    User.destroy(query)
    .then((user) => res.status(201).json({ message: `${user} successfully deleted.`}))
    .catch((err) => res.status(500).json({ error: err}))
})


module.exports = router;