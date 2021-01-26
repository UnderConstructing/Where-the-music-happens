const express = require('express')
const https = require('https')
const app = express()

const PORT = process.env.PORT || 4000

app.get('/about/api', (req, res) => {
    console.log(req)
    res.send('hi there fella')
})

app.listen(PORT, function(err) {
    if (err) console.log("error fail")
    console.log("Server listening on Port", PORT)
})