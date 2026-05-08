var express = require("express");
var router = express.Router();

var minigameController = require("../controllers/minigameController");

router.post("/minigameSave", function (req, res) {
    minigameController.minigameSave(req, res);
})

module.exports = router;