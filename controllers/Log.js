const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { Log, User } = require("../models");


router.get('/practice', validateJWT, (req, res) => {
    res.send("HIIIIIIIIIIIIII")
});

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
        owner: id
    }
    try {
        const newLog = await Log.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    // JournalModel.create(journalEntry)
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
                owner: id
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
            owner: userId
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
        notes,
        owner: id
   };

    try {
        const update = await Log.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
==========================
DELETE A LOG
==========================
*/
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const LogId = req.params.id;

    try {
        const query = {
            where: {
                id: LogId,
                owner: ownerId
            }
        };

        await Log.destroy(query);
        res.status(200).json({ message: "Log Entry Removed "});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router