const { UniqueConstraintError } = require("sequelize/lib/errors")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { Log, User, Profile } = require("../models/Index");

/*
=====================================
    PROFILE CREATE 
=====================================
*/
router.post("/", validateJWT, async (req, res) => {
    const profileCheck = {
        where: {
            userId: req.user.id
        }
    }
    Profile.findAll(profileCheck)
    .then((results, err) => {
        if (results.length === 0){
            Profile.create({
                first_name: req.body.profile.first_name,
                diaversary: req.body.profile.diaversary,
                location: req.body.profile.location,
                userId: req.user.id
            })
                .then(
                    function newProfile(profile){
                        res.json({
                            message: "Profile created.",
                            profile: profile
                        })
                    }

                )
                .catch(err => res.status(500).json({error: err}))
                } else {
                    res.status(409).json({message: "You already have a profile. Please edit instead."})
                } if (err) {
                    console.log(err)
                }  
    }).catch((err) => res.status(500).json({message: "No information", error: err}))    
})


  
//     const { first_name, diaversary, location } = req.body.profile;
//     const  { id } = req.user
//     const profileEntry = {
//         first_name,
//         diaversary,
//         location,
//         userId: id
//     }
//     try {
//         const newProfile = await Profile.create(profileEntry);
//         res.status(200).json(newProfile)
//     } catch (err) {
//      res.status(500).json({ err: err })
//     }
//  } else {
//      res.status(409).json({ message: "You already have a profile. Please edit instead."})
//  }
// });
// })
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
                userId: id
            }
        });
        res.status(200).json(userProfile);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// ========================
// UPDATE A PROFILE
// ========================
// */
router.put("/update/:id", validateJWT, async (req, res) => {
    try {
    userId = req.user.id;
    profileId = req.params.id;
    const { first_name, diaversary, location } = req.body.profile

    const query = {
        where: {
            id: profileId,
            userId: userId
        }
    }

    const updatedProfile = {
        first_name,
        diaversary,
        location
    }

    const profileUpdated = await Profile.update(updatedProfile, query)
    if (profileUpdated) res.status(200).json({message: `Profile at id ${profileId} is now updated`, updatedProfile})
    else {
        res.status(404).json({
            message: 'Profile not found in database'
        })
    }
} catch (error) {
    res.status(500).json({
        message: `Error: ${error}`
    })
}
})

/*
======================
DELETE A PROFILE
======================
*/

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const profileId = req.params.id;

    try {
        const query = {
            where: {
                id: profileId,
                userId: userId
            }
        };

        await Profile.destroy(query);
        res.status(200).json({ message: "Profile deleted "});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router