const router = require("express").Router()
const Msg = require("../../models/message")

router.get("/", async (req, res) => {
    console.log("HERE")
    try {
        const messages = await Msg.find({})

        res.json(messages)
        console.log(messages)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post("/", async (req, res) => {
    try {
        await Msg.create(req.body)
        console.log(req.body)
        // res.sendStatus(200)
        res.json(req.body)
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router