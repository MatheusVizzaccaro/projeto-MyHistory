var characterModel = require("../models/characterModel");

function characterSave(req, res) {
    var character_id = req.body.character_idServer;
    var fk_user_id = req.body.fk_user_idServer;

    characterModel.characterSave(character_id, fk_user_id).then(
        function (resultado) {
            res.json(resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);   
        }
    );
}

module.exports = {
    characterSave
}