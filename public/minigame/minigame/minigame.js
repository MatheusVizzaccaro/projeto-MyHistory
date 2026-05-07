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
        currentPhase++;
    } else if (currentQuestion == 4) {
        currentPhase++;
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
        () => alert("paroo")
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
    if(!answers[currentQuestion] || answers[currentQuestion].radio_id == null) {
        advance_button.disabled = true;
        previous_button.disabled = true;
    } else {
        advance_button.disabled = false;
        previous_button.disabled = false;
    }
}

updateQuestion();
