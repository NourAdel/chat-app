const express = require("express");
const router = express.Router();

router.get ('/', (re, res)=> {
    res.send('Server is up and running')
})

module.exports= router;