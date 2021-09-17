const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { Script, User } = require("../models");


/*
=====================================
    PRESCRIPTION CREATE
=====================================
*/
router.post("/create", validateJWT, async (req, res) => {
    const { name, category, expiration, notes } = req.body.script;
    const { id } = req.user;
    const scriptEntry = {
        name,
        category,
        expiration,
        notes,
        userId: id
    }
    try {
        const newScript = await Script.create(scriptEntry);
        res.status(200).json(newScript);
    } catch (err) {
        res.status(500).json({ error: err });
    }

});


/*
========================
GET PRESCRIPTIONS BY USER
========================
*/
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userScripts = await Script.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userScripts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// /*
// ========================
// GET LOGS BY CATEGORY
// ========================
// */
router.get("/mine/:category", validateJWT, async (req, res) => {
 const {category}  = req.params;
    const{ id } = req.user
    try {
        const results = await Script.findAll({
            where: { 
                category: category,
                userId: id 
            }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
/*
// ========================
// UPDATE A PRESCRIPTION
// ========================
// */
router.put("/update/:entryId", validateJWT, async (req, res) => {
    const { name, category, expiration, notes } = req.body.script;
    const scriptId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
           id: scriptId,
           userId: userId
        }
    };

    const updatedScript = {
        name,
        category,
        expiration,
        notes
    }

    try {
        const update = await Script.update(updatedScript, query);
       if (update) res.status(200).json({
           message: `Prescription at id ${scriptId} successfully updated`});
    else {
        res.status(404).json({
            message: 'Prescription not found'})}
        }catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
==========================
DELETE A PRESCRIPTION
==========================
*/
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const scriptId = req.params.id;

    try {
        const query = {
            where: {
                id: scriptId,
                userId: userId
            }
        };

        await Script.destroy(query);
        res.status(200).json({ message: "Prescription Entry Removed "});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router