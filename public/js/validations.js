function stringLength(string, fieldName, min, max) {
    if(string.length > max) {
        return [false, `O ${fieldName} é muito longo. (máximo: ${max}) caracteres)`];
    } else if (string.length < min) {
        return [false, `O ${fieldName} é muito curto. (mínimo: ${min}) caracteres)`];
    } else {
        return [true, `${fieldName} é válido`];
    }
}   

function isUsername(string) {
    if(stringLength(string, "username", 4, 30)[0]) {
        return [true, stringLength(string, "Username", 4, 30)[1]];
    } else {
        return [false, stringLength(string, "Username", 4, 30)[1]]
    }
}

function isEmail(string) {
    let indexAt = string.indexOf("@");
    let lastIndexAt = string.lastIndexOf("@");
    let indexDot = string.lastIndexOf(".");



    if(stringLength(string, null, 7, 30)[0]) {
        if (indexAt == -1) {
            return [false, `O Email não tem "@".`];
        } else if (indexAt !== lastIndexAt) {
            return [false, `o Email não pode ter mais que um "@".`];
        } else if (indexAt > indexDot) {
            return [false, `o Email não tem nenhum "." depois do "@".`];
        } else if (string.length == indexDot + 1) {
            return [false, `o Email não tem nenhum domínio. (Ex: ".com")`];
        } else {
            return [true, stringLength(string, "Email", 7, 30)[1]]
        }
    } else {
        return [false, stringLength(string, "Email", 7, 30)[1]]
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

    if (stringLength(string, null, 8, 30)[0]) {
        phases.push(true);
    } else {
        phases.push(false);
    }

    for(let i=0;i<phases.length;i++) {
        if(phases[i] === false) {
            return [false, phases];
        } 
    }

    return [true, phases];
}

function passwordsMatch(string1, string2) {
    if (string1.length == 0 && string2.length == 0) {
        return [false, "As senhas não podem ser nulas."]
    } else if (string1 == string2) {
        return [true, "As senhas coincidem."];
    } else {
        return [false, "As senhas não coincidem."]
    }
}

function validateSignUp() {
    let username = ipt_username.value;
    let email = ipt_email.value;
    let password = ipt_password.value;
    let passwordConfirm = ipt_password_confirm.value;


    if(!isUsername(username)[0]) {
        return false;
    }

    if(!isEmail(email)[0]) {
        return false;
    }

    if(!isPassword(password)[0]) {
        return false;
    }

    if(!passwordsMatch(password, passwordConfirm)[0]) {
        return false;
    }   
    
    return true;
}




