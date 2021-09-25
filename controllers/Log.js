const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { Log, User } = require("../models");


/*
=====================================
    LOG CREATE
=====================================
*/
router.post("/create", validateJWT, async (req, res) => {
    const { date, time, blood_glucose, carbs, bolus, correction_dose, long_acting_dose, notes } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        date,
        time,
        blood_glucose,
        carbs,
        bolus,
        correction_dose,
        long_acting_dose,
        notes,
        userId: id
    }
    try {
        const newLog = await Log.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    
});


/*
========================
GET LOGS BY USER
========================
*/
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await Log.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// /*
// ========================
// GET LOGS BY CATEGORY
// ========================
// */
// router.get("/mine/:category", validateJWT, async (req, res) => {
//  const {category}  = req.params;
//     const{ id } = req.user
//     try {
//         const results = await Log.findAll({
//             where: { 
//                 category: category,
//                 owner: id 
//             }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });
/*
// ========================
// UPDATE A LOG
// ========================
// */
router.put("/update/:entryId", validateJWT, async (req, res) => {
    const { date, time, blood_glucose, carbs, bolus, correction_dose, long_acting_dose, notes } = req.body.log;
    const logId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
           userId: userId
        }
    };

    const updatedLog = {
        date,
        time,
        blood_glucose,
        carbs,
        bolus,
        correction_dose,
        long_acting_dose,
        notes      
   };

    try {
        const update = await Log.update(updatedLog, query);
       if (update) res.status(200).json({
           message: `Log at id ${logId} successfully updated`});
    else {
        res.status(404).json({
            message: 'Log not found'})}
        }catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
==========================
DELETE A LOG
==========================
*/
router.delete("/delete/:entryId", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const logId = req.params.entryId;

    try {
        const query = {
            where: {
                id: logId,
                userId: userId
            }
        };

        let deleted = await Log.destroy(query);
        if (deleted){
        res.status(200).json({ message: "Log Entry Removed "});
    } else {
        res.status(404).json({
            message: "Log ID not found in database"
        })
    }
} catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router