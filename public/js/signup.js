function updateScreenUsername() {
    let username = ipt_username.value;

    if(isUsername(username)[0]) {
        username_val_msg.innerHTML = `<span class="success">${isUsername(username)[1]}</span>`
    } else {
        username_val_msg.innerHTML = `<span class="fail">${isUsername(username)[1]}</span>`
    }
}

function updateScreenEmail() {
    let email = ipt_email.value;

    if(isEmail(email)[0]) {
    email_val_msg.innerHTML = `<span class="success">${isEmail(email)[1]}</span>`
    } else {
        email_val_msg.innerHTML = `<span class="fail">${isEmail(email)[1]}</span>`
    }
}

function updateScreenPassword() {
    let senha = ipt_password.value;
    let phases = isPassword(senha)[1];

    password_list.innerHTML = "";
    if(phases[0] == false) {
        password_list.innerHTML += `<div class="fail" id="list_symbol">A senha não tem símbolos.</div>`;
    } else {
        password_list.innerHTML += `<div class="success" id="list_symbol">A senha tem símbolos.</div>`;
    }
        
    if(phases[1] == false) {
        password_list.innerHTML += `<div class="fail" id="list_number">A senha não tem números.</div>`;
    } else {
        password_list.innerHTML += `<div class="success" id="list_number">A senha tem números.</div>`;
    }
    
    if(phases[2] == false) {
        password_list.innerHTML += `<div class="fail" id="list_capital">A senha tem letras maiúsculas.</div>`;
    } else {
        password_list.innerHTML += `<div class="success" id="list_capital">A senha tem letras maiúsculas.</div>`;
    }
}

function updateScreenPasswordConfirm() {
    let password = ipt_password.value;
    let passwordConfirm = ipt_password_confirm.value;
    
    if(passwordsMatch(password, passwordConfirm)[0]) {
        password_confirm_list.innerHTML = `<div class="success" id="list_capital">As senhas coincidem.</div>`;
    } else {
        password_confirm_list.innerHTML = `<div class="fail" id="list_capital">As senhas não coincidem.</div>`;
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

            if(answer.ok) {
                alert("redirecionando...")
            } else {
                alert("erro n sei noq")
            }
        } catch (err) {
            console.log(err);
        }
    }
}