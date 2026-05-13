var minigameModel = require("../models/minigameModel");

function minigameSave(req, res) {
    var u_ans = req.body.answers;

    minigameModel.minigameSave(u_ans[0].radio_id, u_ans[1].radio_id, u_ans[2].radio_id, u_ans[3].radio_id, u_ans[4].radio_id, req.body.fk_user_idServer).then(
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

function minigameSaveData(req, res) {
    var u_ans = req.body.game_data;

    minigameModel.minigameSaveData(u_ans[0], req.body.fk_user_idServer).then(
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
    minigameSave,
    minigameSaveData
}