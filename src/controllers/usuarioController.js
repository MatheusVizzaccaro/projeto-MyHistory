var usuarioModel = require("../models/usuarioModel");

function login(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.passwordServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.login(email, senha)
            .then(
                function (resultadoLogin) {
                    console.log(`\nResultados encontrados: ${resultadoLogin.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoLogin)}`); // transforma JSON em String

                    if (resultadoLogin.length == 1) {
                        res.json(resultadoLogin);
                    } else if (resultadoLogin.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(520).send("Erro desconhecido.")
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var username = req.body.usernameServer;
    var email = req.body.emailServer;
    var password = req.body.passwordServer;

    // Faça as validações dos valores
    if (username == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (password == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.verifyUsername(username)
            .then(function (usernameExistente) {
                console.log("Resultado do verifyUsername:", usernameExistente);
                if (usernameExistente.length > 0) {
                    res.status(409).send("Este username ja está cadastrado!")
                } else {
                    usuarioModel.verifyEmail(email)
                        .then(function (emailExistente) {
                            console.log("Resultado do verifyEmail:", emailExistente);
                            if (emailExistente.length > 0) {
                                res.status(409).send("Este email já está cadastrado!");
                            } else {
                                usuarioModel.cadastrar(username, email, password)
                                    .then(
                                        function (resultado) {
                                            res.json(resultado);
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
                        }).catch(function (erro) {
                            console.log(erro)
                            res.status(500).json(erro.sqlMessage);
                        })
                }
            })
    }
}

module.exports = {
    login,
    cadastrar
}