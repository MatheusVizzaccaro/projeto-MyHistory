async function saveChoice(choice) {
    if(choice > 3 || choice < 1) {
        return {"status":false, "message":"Você não pode escolher um personagem diferente do personagem 1, 2 ou 3."}
    } else {
        var character_id = choice;
        var fk_user_id = sessionStorage.USER_ID;
        
        try {
            const answer = await fetch("http://localhost:3333/character/characterSave", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    character_idServer: character_id,
                    fk_user_idServer: fk_user_id
                })
            });
            console.log(answer);
            if(answer.ok) {
                window.location = "../minigame/minigame.html";
            } else {
                return alert("Erro Desconhecido.");
            }
        } catch (err) {
            console.log(err);
        }
    }
}