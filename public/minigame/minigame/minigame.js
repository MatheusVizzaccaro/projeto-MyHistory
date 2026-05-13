let answers = []
let userGameData = []
let currentQuestion = 0;
let currentPhase = 1;
let correctAnswers = 0;

function showMessage(message, status) {
    if(status == false) {
        setTimeout(() => {quiz_message.innerHTML = ""}, 3000)
        quiz_message.innerHTML = `<span style="color: red;">${message}</span>`
    } else {
        setTimeout(() => {quiz_message.innerHTML = ""}, 3000)
        quiz_message.innerHTML = `<span style="color: white;">${message}</span>`
    }
}

function getAnswer() {
    let data = new FormData(quiz_form);
    return {"question": currentQuestion, "radio_id": data.get("ipt_radio")};
}

function pushAnswer() {
    if(getAnswer().radio_id == undefined) {
        showMessage("Você deve preencher alguma alternativa antes de avançar!", false);
    } else {
        showMessage("Resposta submetida", true);
        answers[currentQuestion] = getAnswer();
        if(getAnswer().radio_id == questionsArr[currentQuestion].correct_option) {
            document.getElementById(`div_option_${questionsArr[currentQuestion].correct_option}`).classList.add("success");
            correctAnswers++;
        } else {
            document.getElementById(`div_option_${questionsArr[currentQuestion].correct_option}`).classList.add("success");
            document.getElementById(`div_option_${getAnswer().radio_id}`).classList.add("fail");
        }
        checkAnswer();
    }
}

function updateQuestion() {
    if(currentQuestion == 2) {
        currentPhase = 2;
    } else if (currentQuestion == 4) {
        currentPhase = 3;
    }

    document.getElementById("div_option_1").classList.remove("success", "fail");
    document.getElementById("div_option_2").classList.remove("success", "fail");
    document.getElementById("div_option_3").classList.remove("success", "fail");
    document.getElementById("div_option_4").classList.remove("success", "fail");

    if (currentQuestion <= 4) {
        question_options.style.display = 'flex';
        quiz_phase.innerHTML = `Fase: ${currentPhase}`
        quiz_info.innerHTML = `<b>Essa é a pergunta ${currentQuestion + 1}/5<b>`
        question_nome.innerHTML = questionsArr[currentQuestion].statement;
        div_option_1.innerHTML = questionsArr[currentQuestion].option_A;
        option_1.checked = false;
        div_option_2.innerHTML = questionsArr[currentQuestion].option_B;
        option_2.checked = false;
        div_option_3.innerHTML = questionsArr[currentQuestion].option_C;
        option_3.checked = false;
        div_option_4.innerHTML = questionsArr[currentQuestion].option_D;
        option_4.checked = false;
    } else if (currentQuestion == 5) {
        quiz_phase.innerHTML = "";
        quiz_info.innerHTML = `Você finalizou o quiz!`
        question_nome.innerHTML = "O resumo do seu quiz está pronto para acessar!"
        question_options.style.display = 'none';
    }

    checkAnswer();
}

function changeQuestion(limit, math, nextAction) {
    if(limit()) {
        math();
        updateQuestion();
    } else {
        nextAction();
    }
}

function nextQuestion() {
    changeQuestion(
        () => currentQuestion < questionsArr.length,
        () => currentQuestion++,
        async () => {
            currentQuestion = 0;
            userGameData.push(correctAnswers)
            try {
                const answer = await fetch("http://localhost:3333/minigame/minigameSave", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({"answers": answers, "fk_user_idServer": sessionStorage.USER_ID})
                });
                console.log(answer);
                if(answer.ok) {
                    console.log("Primeiro insert das respostas foi")
                } else {
                    return alert("Erro Desconhecido.");
                }
            } catch (err) {
                console.log(err);
            }
            try {
                const answer = await fetch("http://localhost:3333/minigame/minigameSaveData", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({"game_data": userGameData, "fk_user_idServer": sessionStorage.USER_ID})
                });
                console.log(answer);
                if(answer.ok) {
                    window.location = "../../dashboard/dashboard.html";
                } else {
                    return alert("Erro Desconhecido.");
                }
            } catch (err) {
                console.log(err);
            }
        }
    );
}

function previousQuestion() {
    changeQuestion(
        () => currentQuestion > 0,
        () => currentQuestion = 0,
        () => alert("paroo 2")
    );
}

function checkQuestion (conditional, action) {
    if(conditional()) {
        action()
        return;
    }
}

function checkAnswer() {
    previous_button.disabled = true;

    checkQuestion(
        () => currentQuestion <= 4,
        () => {
            if(!answers[currentQuestion] || answers[currentQuestion].radio_id == null) {
                advance_button.disabled = true;
           } else {
                advance_button.disabled = false;
                previous_button.disabled = true;
            }
        }
    )

    checkQuestion(
        () => currentQuestion == 5,
        () => {
            submit_button.disabled = true;
            previous_button.disabled = false;
        }
    )
}

updateQuestion();