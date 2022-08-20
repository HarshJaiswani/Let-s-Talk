const express = require("express");
const router = express.Router();

router.get('/',(re,res) => {
    res.send("Server is Up and Running");
})

module.exports = router;