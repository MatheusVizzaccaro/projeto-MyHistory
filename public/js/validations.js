function isUsername(string) {
    if(string.length > 30) {
        return [false, `O username é muito longo (máximo: 30 caracteres)`]
    } else {
        return [true, `Username válido`]
    }
}

function isEmail(string) {
    let indexAt = string.indexOf("@");
    let indexDot = string.lastIndexOf(".");


    if (indexAt == -1) {
        return [false, `O Email não tem "@"`];
    } else if (indexAt > indexDot) {
        return [false, `o Email não tem nenhum "." depois do "@"`];
    } else if (string.length == indexDot + 1) {
        return [false, `o Email não tem nenhum domínio (Ex: ".com")`];
    } else {
        return [true, "Email válido."];
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

    for(let i=0;i<phases.length;i++) {
        if(phases[i] === false) {
            return [false, phases];
        } 
    }
    return [true, phases];
}

function validateSignUp() {
    let email = ipt_email.value;
    let senha = ipt_password.value;
    let username = ipt_username.value;

    if(!isUsername(username)[0]) {
        return false;
    }

    if(!isEmail(email)[0]) {
        return false;
    }

    if(!isPassword(senha)[0]) {
        return false;
    }

    return true;
}




