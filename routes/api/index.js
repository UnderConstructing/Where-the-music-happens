const router = require("express").Router()

router.use("/msg", require("./messages"))
router.use("/user", require("./user"))
router.use("/save", require("./save"))
router.use("/send", require("./send"))
module.exports = router