var database = require("../database/config")

function minigameSave(q1, q2, q3, q4, q5, fk_user_id) {
    var instrucaoSQL = `
        INSERT INTO user_game_answers VALUES (default, ${q1}, ${q2}, ${q3}, ${q4}, ${q5}, ${fk_user_id}, current_timestamp());
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function minigameSaveData(correctQuestions, fk_user_id) {
    var instrucaoSQL = `
        INSERT INTO user_game_data VALUES (default, ${correctQuestions}, ${5 - correctQuestions}, ${fk_user_id});
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    minigameSave,
    minigameSaveData
};