const router = require("express").Router()

router.use("/msg", require("./messages"))
router.use("/user", require("./user"))

module.exports = router