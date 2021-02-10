const router = require("express").Router()

router.use("/msg", require("./messages"))
router.use("/user", require("./user"))
router.use("/save", require("./save"))

module.exports = router