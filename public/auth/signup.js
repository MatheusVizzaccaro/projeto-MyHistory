function updateScreenUsername() {
    let username = ipt_username.value;

    if(isUsername(username).status) {
        username_val_msg.innerHTML = `<span class="success">${isUsername(username).message}</span>`
    } else {
        username_val_msg.innerHTML = `<span class="fail">${isUsername(username).message}</span>`
    }
}

function updateScreenEmail() {
    let email = ipt_email.value;

    if(isEmail(email).status) {
    email_val_msg.innerHTML = `<span class="success">${isEmail(email).message}</span>`
    } else {
        email_val_msg.innerHTML = `<span class="fail">${isEmail(email).message}</span>`
    }
}

function updateScreenPassword() {
    let senha = ipt_password.value;
    let phases = isPassword(senha).array;

    password_list.innerHTML = "";
    if(phases[0] == false) {
        password_list.innerHTML += `<div class="fail" id="list_symbol">A senha não tem símbolos.</div>`;
    }
        
    if(phases[1] == false) {
        password_list.innerHTML += `<div class="fail" id="list_number">A senha não tem números.</div>`;
    }
    
    if(phases[2] == false) {
        password_list.innerHTML += `<div class="fail" id="list_capital">A senha tem letras maiúsculas.</div>`;
    }

    if(phases[3] == false) {
        password_list.innerHTML += `<div class="fail" id="list_capital">A senha deve conter entre 8 a 30 caracteres.</div>`;
    }
}

function updateScreenPasswordConfirm() {
    let password = ipt_password.value;
    let passwordConfirm = ipt_password_confirm.value;
    
    if(passwordsMatch(password, passwordConfirm).status) {
        password_confirm_list.innerHTML = `<div class="success" id="list_capital">${passwordsMatch(password, passwordConfirm).message}</div>`;
    } else {
        password_confirm_list.innerHTML = `<div class="fail" id="list_capital">${passwordsMatch(password, passwordConfirm).message}</div>`;
    }
}

async function insertUser() {
    if(!validateSignUp()) {
        sign_up_msg.innerHTML = "Preencha corretamente as informações de cadastro.";
        return;
    } else {
        var username = ipt_username.value;
        var email = ipt_email.value;
        var password = ipt_password.value;

        try {
            const answer = await fetch("http://localhost:3333/usuarios/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usernameServer: username,
                    emailServer: email,
                    passwordServer: password
                })
            });

            let msg = await answer.text();

            if(answer.ok) {
                window.location = "login.html"
            } else if (answer.status === 409) {
                if(msg.includes("username")) {
                    username_val_msg.innerHTML = `<span class="fail">Já existe uma conta cadastrada com este username</span>`
                } else if(msg.includes("email")) {
                    email_val_msg.innerHTML = `<span class="fail">Já existe uma conta cadastrada com este email</span>`
                }   
            } else {
                alert("Erro Desconhecido.");
            }
        } catch (err) {
            console.log(err);
        }
    }
}