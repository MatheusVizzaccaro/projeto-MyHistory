var express = require("express");
var router = express.Router();

var characterController = require("../controllers/characterController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/characterSave", function (req, res) {
    characterController.characterSave(req, res);
})

module.exports = router;