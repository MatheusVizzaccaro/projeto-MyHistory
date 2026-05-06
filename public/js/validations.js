function verifySession() {
    var username = sessionStorage.USER_USERNAME;
    var email = sessionStorage.USER_EMAIL;

    console.log(username);
    console.log(email);

    if(username == undefined || email == undefined) {
        alert("Realize o login antes de tentar acessar essa página.");
        window.location = "../auth/login.html";
        return false;
    }
    return true;
}

function stringLength(string, fieldName, min, max) {
    if (string.length > max) {
        return { "status": false, "message": `O ${fieldName} é muito longo. (máximo: ${max}) caracteres)` };
    } else if (string.length < min) {
        return { "status": false, "message": `O ${fieldName} é muito curto. (mínimo: ${min}) caracteres)` };
    } else {
        return {"status": true, "message": `${fieldName} é válido`};
    }
}   

function isUsername(string) {
    if(stringLength(string, "username", 4, 30).status) {
        return {"status": true, "message": stringLength(string, "Username", 4, 30).message};
    } else {
        return {"status": false, "message": stringLength(string, "Username", 4, 30).message}
    }
}

function isEmail(string) {
    let indexAt = string.indexOf("@");
    let lastIndexAt = string.lastIndexOf("@");
    let indexDot = string.lastIndexOf(".");



    if(stringLength(string, null, 7, 30).status) {
        if (indexAt == -1) {
            return {"status": false, "message": `O Email não tem "@".`};
        } else if (indexAt !== lastIndexAt) {
            return {"status": false, "message": `o Email não pode ter mais que um "@".`};
        } else if (indexAt > indexDot) {
            return {"status": false, "message": `o Email não tem nenhum "." depois do "@".`};
        } else if (string.length == indexDot + 1) {
            return{"status": false, "message": `o Email não tem nenhum domínio. (Ex: ".com")`};
        } else {
            return {"status": true, "message": stringLength(string, "Email", 7, 30).message}
        }
    } else {
        return {"status": false, "message": stringLength(string, "Email", 7, 30).message}
    }
}

function isPassword(string) {
    let phases = [];

    let symbols = new RegExp("[^a-zA-Z0-9\s]");
    let numbers = new RegExp("[0-9]");
    let capital = new RegExp("[A-Z]");

    if (!symbols.test(string)) {
        phases.push(false);
    } else {
        phases.push(true);
    }
    
    if (!numbers.test(string)) {
        phases.push(false);
    } else {
        phases.push(true);
    }
    
    if (!capital.test(string)) {
        phases.push(false);
    } else {
        phases.push(true);
    }

    if (stringLength(string, null, 8, 30).status) {
        phases.push(true);
    } else {
        phases.push(false);
    }

    for(let i=0;i<phases.length;i++) {
        if(phases[i] === false) {
            return {"status": false, "array": phases};
        } 
    }

    return {"status": true, "array": phases};
}

function passwordsMatch(string1, string2) {
    if (string1.length == 0 && string2.length == 0) {
        return {"status": false, "message":  "As senhas não podem ser nulas."};
    } else if (string1 == string2) {
        return {"status": true, "message":  "As senhas coincidem."};
    } else {
        return {"status": false, "message":  "As senhas não coincidem."};
    }
}

function validateSignUp() {
    let username = ipt_username.value;
    let email = ipt_email.value;
    let password = ipt_password.value;
    let passwordConfirm = ipt_password_confirm.value;


    if(!isUsername(username).status) {
        return false;
    }

    if(!isEmail(email).status) {
        return false;
    }

    if(!isPassword(password).status) {
        return false;
    }

    if(!passwordsMatch(password, passwordConfirm).status) {
        return false;
    }   
    
    return true;
}