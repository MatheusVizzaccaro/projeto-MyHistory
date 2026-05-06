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
            sessionStorage.USER_USERNAME = json[0].username;
            sessionStorage.USER_EMAIL = json[0].email;
            sessionStorage.USER_ID = json[0].id;
            window.location = "../minigame/minigame.html";
        } else if (answer.status === 403) {
            login_msg.innerHTML = "Credenciais inválidas.";
        } else {
            alert("Erro Desconhecido.");
        }
    } catch (err) {
        console.log(err);
    }
}