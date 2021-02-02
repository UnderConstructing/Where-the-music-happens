const router = require("express").Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('../../config/passport')

router.post("/save", (req, res) => {
    console.log(req.body)
})

module.exports = router
