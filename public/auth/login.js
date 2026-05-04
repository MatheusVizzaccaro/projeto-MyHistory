async function loginUser() {
    var email = ipt_email.value;
    var password = ipt_password.value;

    try {
        const answer = await fetch("http://localhost:3333/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                emailServer: email,
                passwordServer: password
            })
        });

        if(answer.ok) {
            let json = await answer.json()
            console.log(json);
            sessionStorage.NOME_USUARIO = json[0].username;
            sessionStorage.EMAIL_USUARIO = json[0].email;
            alert("redirecionando...")
        } else if (answer.status === 403) {
            login_msg.innerHTML = "Credenciais inválidas.";
        } else {
            alert("Erro Desconhecido.");
        }
    } catch (err) {
        console.log(err);
    }
}