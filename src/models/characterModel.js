var database = require("../database/config")

function characterSave(character_id, fk_user_id) {
    var instrucaoSQL = `
        INSERT INTO user_character(id, character_id, fk_user_id, insert_date) VALUES (default, ${character_id}, ${fk_user_id}, current_timestamp());
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    characterSave
};