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

function insertUser() {
    if(validateSignUp()) {
        //Cenário em que tudo está correto para prosseguir
        alert("teste");
    } else {
        sign_up_msg.innerHTML = "Preencha corretamente as informações de cadastro.";
    }
}