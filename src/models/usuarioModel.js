var database = require("../database/config")

function login(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT email, password FROM users WHERE email = '${email}' AND password = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verifyUsername(username) {
    var instrucaoSQL = `
        SELECT username FROM users WHERE username LIKE '${username}';
    `;
    return database.executar(instrucaoSQL);
}

function verifyEmail(email) {
    var instrucaoSQL = `
        SELECT email FROM users WHERE email LIKE '${email}';
    `;
    return database.executar(instrucaoSQL);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(username, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", username, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    login,
    cadastrar,
    verifyEmail,
    verifyUsername
};