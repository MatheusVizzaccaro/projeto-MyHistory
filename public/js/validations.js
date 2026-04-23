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
        // return [false, "A senha não possui símbolos."];
    } else {
        phases.push(true);
    }
    
    if (!numbers.test(string)) {
        phases.push(false);
        // return [false, "A senha não possui números."];
    } else {
        phases.push(true);
    }
    
    if (!capital.test(string)) {
        phases.push(false);
        // return [false, "A senha não possui letras maiúsculas."];
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



