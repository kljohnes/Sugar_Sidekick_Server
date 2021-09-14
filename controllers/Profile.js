const { UniqueConstraintError } = require("sequelize/lib/errors")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { Log, User, Profile } = require("../models");

/*
=====================================
    PROFILE CREATE - MINE
=====================================
*/
router.post("/", validateJWT, async (req, res) => {
    const { first_name, diaversary, dark_mode, userId } = req.body.profile;
    const { owner } = req.body.user;
    const { userId } = req.body.user.id
    const profileEntry = {
        first_name,
        diaversary,
        dark_mode,
        userId: userId
    }
    try {
        const findProfile = {
            where: {
                userId: userId  
            }
        };
        await Profile.findOne(findProfile)
        if (findProfile) 
        {  res.status(409).json({message: "You already have a profile."})}
        else {const newProfile = await Profile.create(profileEntry);
        res.status(200).json(newProfile);await User.setProfile(newProfile)} console.log(newProfile)
        } catch (err) {
     res.status(500).json({ error: err })
    }
    // JournalModel.create(journalEntry)
});

/*
========================
VIEW PROFILE BY USER
========================
*/
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userProfile = await Profile.findOne({
            where: {
                owner: id
            }
        });
        res.status(200).json(userProfile);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router