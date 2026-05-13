var express = require("express");
var router = express.Router();

var minigameController = require("../controllers/minigameController");

router.post("/minigameSave", function (req, res) {
    minigameController.minigameSave(req, res);
})

router.post("/minigameSaveData", function (req, res) {
    minigameController.minigameSaveData(req, res);
})

module.exports = router;