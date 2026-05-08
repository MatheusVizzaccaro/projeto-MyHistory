let answers = []
let currentQuestion = 0;
let currentPhase = 1;

function showMessage(message, status) {
    if(status == false) {
        setTimeout(() => {quiz_message.innerHTML = ""}, 3000)
        quiz_message.innerHTML = `<span style="color: red;">${message}</span>`
    } else {
        setTimeout(() => {quiz_message.innerHTML = ""}, 3000)
        quiz_message.innerHTML = `<span style="color: green;">${message}</span>`
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
        showMessage("Resposta submetida.", true);
        answers[currentQuestion] = getAnswer();
        checkAnswer();
    }
}

function updateQuestion() {
    if(currentQuestion == 2) {
        currentPhase = 2;
    } else if (currentQuestion == 4) {
        currentPhase = 3;
    }

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
        () => currentQuestion < questionsArr.length -1,
        () => currentQuestion++,
        async () => {
            try {
                const answer = await fetch("http://localhost:3333/minigame/minigameSave", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({"answers": answers, "fk_user_idServer": sessionStorage.USER_ID})
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
        () => currentQuestion--,
        () => alert("paroo 2")
    );
}

function checkAnswer() {
    if(!answers[currentQuestion] || answers[currentQuestion].radio_id == null) { // condicional de quando a questão não foi preenchida.
        advance_button.disabled = true;
        previous_button.disabled = false; // faz com que o botão de voltar seja liberado a partir da questão 2
    } else {
        advance_button.disabled = false;
        previous_button.disabled = false;
    }

    if(currentQuestion == 0) {
        previous_button.disabled = true;
    }
}

updateQuestion();