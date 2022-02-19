//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ -> obter um só quiz
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes -> criar um quiz
//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
let indexAnswer = 0;
let indexScroll = 0;
let userAnswers = [];
let chosenQuiz;
let quizCreatedTitle1, quizCreatedURL1, quizCreatedNumberOfQuestions1, quizCreatedNumOfLevels1 = null;
let quizCreatedTitle2, quizCreatedURL2, quizCreatedNumberOfQuestions2, quizCreatedNumOfLevels2 = null;
let quizCreatedTitle3, quizCreatedURL3, quizCreatedNumberOfQuestions3, quizCreatedNumOfLevels3 = null;
let quizCorrectTitle1, quizCorrectURL1, quizCorrectNumOfQuestions1, quizCorrectNumOfLevels1 = null;
let quizCorrectTitle2, quizCorrectURL2, quizCorrectNumOfQuestions2, quizCorrectNumOfLevels2 = null;
let quizCorrectTitle3, quizCorrectURL3, quizCorrectNumOfQuestions3, quizCorrectNumOfLevels3 = null;
let questionText1, questionBackground1, questionCorrect1, questionImageURL1 = null;
let questionText2, questionBackground2, questionCorrect2, questionImageURL2 = null;
let questionText3, questionBackground3, questionCorrect3, questionImageURL3 = null;
let questionCorrectText1, questionCorrectBackground1, questionCorrectAnswer1, questionCorrectImageURL1 = null;
let questionCorrectText2, questionCorrectBackground2, questionCorrectAnswer2, questionCorrectImageURL2 = null;
let questionCorrectText3, questionCorrectBackground3, questionCorrectAnswer3, questionCorrectImageURL3 = null;
let questionIncorrect11, questionIncorrect12, questionIncorrect13 = null;
let questionIncorrect21, questionIncorrect22, questionIncorrect23 = null;
let questionIncorrect31, questionIncorrect32, questionIncorrect33 = null;
let questionIncorrectURL11, questionIncorrectURL12, questionIncorrectURL13 = null;
let questionIncorrectURL21, questionIncorrectURL22, questionIncorrectURL23 = null;
let questionIncorrectURL31, questionIncorrectURL32, questionIncorrectURL33 = null;
let questionIncorrectCorrect1, questionIncorrectCorrect2, questionIncorrectCorrect3 = null;

function loadQuiz(){
    document.querySelector('.main').innerHTML = '<section class="page-body"></section>';
    const request = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    request.then((response) => {
        const quizes = document.querySelector('.page-body');
        for(let i in response.data){
            quizes.innerHTML += `
            <div id='${response.data[i].id}' class='single-quiz' onclick='renderSingleQuiz(this);'>
                <div class='overlap'></div>
                <div class='thumb-quiz'><img src='${response.data[i].image}' alt='Imagem não carregada.'></div>
                <div class='title-quiz'><p>${response.data[i].title}</p></div>    
            </div>`;
        }
    }).catch((error) => {
        console.log(error);
    })
}

function renderSingleQuiz(object){
    chosenQuiz = object.id;
    const request = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${object.id}`);
    let rowIndexer = 0;
    request.then((response) => {
        const main = document.querySelector('.main');
        const questions = response.data.questions;
        console.log(response.data);
        main.innerHTML = '';
        main.innerHTML = `<div class='image-single-quiz'>
            <div class='overlap-banner-quiz'></div>
            <img src='${response.data.image}' alt='Imagem não carregada.'>
            <span class='quiz-title'>${response.data.title}</span>
        </div><div class='main-container-questions'>`;
        for(let i in questions){
            main.innerHTML += `<div class='subcontainer-question'>
                <div class='quiz-question'><p>${questions[i].title}</p></div>
                <div class='container-answers container-question-${i}'>
                    <div class='answers-row' id='row-${rowIndexer}'>
                    ${renderSingleAnswer(questions[i], object, ++rowIndexer)}</div>
                </div></div>`;
            document.querySelectorAll('.quiz-question')[i].style.background = questions[i].color;
            rowIndexer++;
        }
        main.innerHTML += `</div>`;
    }).catch((error) => {
        console.log(error);
    });
}

function isCorrect(object, id){
    const container = object.parentNode.parentNode;
    const answer = document.querySelector(`#${object.id} > .title-answer`).innerHTML;
    const request = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    request.then((response) => {
        const questions = response.data.questions;
        const levels = response.data.levels;
        const answers = getAnswers(questions);
        for(let i in answers){
            for(let j in answers[i]){
                if(answer === answers[i][j].text){
                    if(answers[i][j].isCorrectAnswer){
                        indexScroll += answers.length;
                        setTimeout(() => {
                            const selector = document.querySelector(`#answer-${indexScroll}`);
                            if(selector !== undefined){
                                selector.scrollIntoView();
                            }
                        }, 2000);
                        removeClickEvent(container);
                        correctAnswer(container, object);
                    }else{
                        setTimeout(() => {
                            const selector = document.querySelector(`#answer-${indexScroll}`);
                            if(selector !== undefined){
                                selector.scrollIntoView();
                            }
                        }, 2000);
                        removeClickEvent(container);
                        wrongAnswers(answers[i], object.id, container);
                    }
                    userAnswers.push(answers[i][j].isCorrectAnswer);
                }
            }
        }
        if(userAnswers.length === questions.length){
            console.log('teste');
            endQuiz(userAnswers, questions.length, levels);
        }
    }).catch((error) => {
        console.log(error);
    });
}

function getAnswers(questionAnswers){
    let answers = {};
    for(let i in questionAnswers){
        answers[i] = questionAnswers[i].answers;
    }
    return answers;
}

function renderSingleAnswer(question, object, rowIndexer){
    let renderSingle = '';
    for(let j in question.answers){
        let aux = parseInt(j);
        if((question.answers.length%2 === 0) && (question.answers.length > 2)){
            if(aux === (question.answers.length/2)){
                renderSingle += `</div><div class='answers-row' id='row-${rowIndexer}'>`;
            }
        }
        renderSingle += `
        <div class='single-answer' onclick='isCorrect(this, ${object.id});' id='answer-${indexAnswer}'>
            <img src='${question.answers[j].image}' alt='Imagem não carregada.'>
            <div class='title-answer'>${question.answers[j].text}</div>
        </div>`;
        indexAnswer++;
    }
    return renderSingle;
}

function auxRenderSingleAnswer(renderSingle){
    for(let j in question.answers){
        renderSingle += `
        <div class='single-answer' onclick='isCorrect(this, ${object.id});' id='answer-${indexAnswer}'>
            <img src='${question.answers[j].image}' alt='Imagem não carregada.'>
            <div class='title-answer'>${question.answers[j].text}</div>
        </div>`;
        indexAnswer++;
    }
}

function removeClickEvent(container){
    const childrenRows = container.children;
    const elements = selectElements(childrenRows);
    for(let i = 0; i < elements.length; i++){
        elements[i].removeAttribute('onclick');
    }
}

function selectElements(childrenRows){
    let elements = [];
    let auxElements;
    for(let i = 0; i < childrenRows.length; i++){
        auxElements = document.querySelector(`#${childrenRows[i].id}`);
        for(let j = 0; j < auxElements.children.length; j++){
            elements.push(auxElements.children[j]);
        }
    }
    return elements;
}

function correctAnswer(container, object){
    const childrenRows = container.children;
    const elements = selectElements(childrenRows);
    for(let i = 0; i < elements.length; i++){
        if(elements[i].id !== object.id){
            elements[i].style.color = 'red';
            elements[i].style.opacity = '0.6';
        }else{
            object.style.color = 'green';
        }
    }
}

function wrongAnswers(answers, objectId, container){
    const childrenRows = container.children;
    const elements = selectElements(childrenRows);
    let answerOptions = [];
    for(let i=0; i < elements.length; i++){
        answerOptions.push(document.querySelector(`#${elements[i].id} > .title-answer`).innerHTML);
    }
    for(let i in answers){
        if(elements[i].id !== objectId){
            elements[i].style.opacity = '0.6';
        }
        for(let j=0; j < answerOptions.length; j++){
            if(answerOptions[j] === answers[i].text){
                if(answers[i].isCorrectAnswer){
                    elements[j].style.color = 'green';
                }else{
                    elements[j].style.color = 'red';
                }
            }
        }
    }
}

function endQuiz(optionAnswers, questionsLength, levels){
    let pontuation = 0;
    let userLevel = {'image': '', 'text': '', 'title': ''}; 
    for(let i = 0; i < optionAnswers.length; i++){
        if(optionAnswers[i]){
            pontuation++;
        }
    }
    let score = (pontuation/questionsLength)*100;
    score = score.toFixed(0);
    console.log(`pontuação: ${score}`);
    for(let i in levels){
        if(score >= levels[i].minValue){
            userLevel = levels[i];
        }
    }
    renderCardEndQuiz(score, userLevel);
}

function renderCardEndQuiz(score, userLevel){
    const main = document.querySelector('.main');
    setTimeout(() => {
    main.innerHTML += `<section class='level-user-card'>
        <div class='title-level'><p>${score}% de acertos: ${userLevel.title}</p></div>
        <div class='img-level'><img src='${userLevel.image}' alt='Imagem não carregada.'></div>
        <div class='text-level'><p>${userLevel.text}</p></div>
    </section>
    <div class='buttons-quiz-page'>
        <div class='reset-button'><button onclick='restartQuiz(this);' value='${chosenQuiz}'>Reiniciar quiz</button></div>
        <div class='back-home-button'><button onclick='backHome();'>Voltar pra Home</button></div></div>`
    document.querySelector('.text-level').scrollIntoView();
    }, 2000)    
}

function restartQuiz(object){
    const obj = {'id': object.value};
    document.querySelector('.main').innerHTML = '';
    renderSingleQuiz(obj);
}

function backHome(){
    document.querySelector('.main').innerHTML = '';
    loadQuiz();
}


// Áre de Guerra. Cuidado! O que tem abaixo está tudo errado. Você foi avisado.

// Botão: Inicia a criação do primeiro Quiz

function insertSecondPage() {
    let currentPage = document.querySelector('.main-2');
    let lastPage = document.querySelector('.main-1');
    if (lastPage.style.display !== 'none') {    
        currentPage.style.display = 'block';
        lastPage.style.display = 'none';
    }
} 

// Inicia criação de um Quiz (Adiciona Informações Básicas do Quiz)

function getQuizTitle (quizCreatedTitle) {
    quizCreatedTitle = document.querySelector('.quiz-title').value;
    console.log(quizCreatedTitle);
    if ((quizCreatedTitle === null) || (quizCreatedTitle.length < 20) || (quizCreatedTitle.length > 65)) {
        alert("Por favor, insira um título válido, que tenha entre 20 e 65 caracteres.");
        quizCorrectTitle = false;
    } else {
        quizCorrectTitle = true;
    }
}

function getQuizURL (quizCreatedURL) {
    quizCreatedURL = document.querySelector('.quiz-image-url').value;
    console.log(quizCreatedURL);
    if ((quizCreatedURL !== null) &&  (quizCreatedURL.startsWith("https://") || quizCreatedURL.startsWith("http://"))) {
        quizCorrectURL = true;
    } else {
        quizCorrectURL = false;
        alert("Por favor, insira uma URL de imagem válida.");
    }
}

function getNumberOfQuestions (quizCreatedNumberOfQuestions) {
    quizCreatedNumberOfQuestions = document.querySelector('.quiz-number-of-questions').value;
    console.log(quizCreatedNumberOfQuestions);
    if ((quizCreatedNumberOfQuestions === null) || (quizCreatedNumberOfQuestions < 3)) {
        alert("São necessárias ao menos 3 perguntas para a criação do quiz.");
        quizCorrectNumOfQuestions = false;
    } else {
        quizCorrectNumOfQuestions = true;
    }
}

function getNumberOfLevels (quizCreatedNumberOfLevels) {
    quizCreatedNumberOfLevels = document.querySelector('.quiz-number-of-levels').value;
    console.log(quizCreatedNumberOfLevels);
    if ((quizCreatedNumberOfLevels === null) || (quizCreatedNumberOfLevels < 2)) {
        alert("São necessários ao menos 2 níveis para a criação do quiz.");
        quizCorrectNumOfLevels = false;
    } else {
        quizCorrectNumOfLevels = true;
    }
}

// Botão: Obtém informações adicionadas nos inputs do quiz, e pula para terceira página (Perguntas do Quiz)

function getQuizBasicInfo () {
    getQuizTitle();
    getQuizURL();
    getNumberOfQuestions();
    getNumberOfLevels();

    if ((quizCorrectTitle === true) && (quizCorrectURL === true) && (quizCorrectNumOfQuestions === true) && (quizCorrectNumOfLevels === true)) {
        let currentPage = document.querySelector('.main-3');
        let lastPage = document.querySelector('.main-2');
        if (lastPage.style.display !== 'none') {    
            currentPage.style.display = 'block';
            lastPage.style.display = 'none';
        }
    }
}

// Criação das perguntas do Quiz

function getQuestionText1 (questionText1) {
    questionText1 = document.querySelector('.first-quiz-text').value;
    if ((questionText1 === null) || (questionText1.length < 20)) {
        alert("Por favor, insira uma pergunta que contenha pelo menos 20 caracteres.")
        questionCorrectText1 = false;
    } else {
        questionCorrectText1 = true;
    }
}

function getQuestionBackground1 (questionBackground1) {
    questionBackground1 = document.querySelector('.first-question-background').value;
    if ((questionBackground1 !== null) && (questionBackground1.startsWith("#")) && ((questionBackground1.length === 7))) {
        questionCorrectBackground1 = true;
    } else {
        alert("Por favor, insira uma coloração hexadecimal válida.");
        questionCorrectBackground1 = false;
    }
}

function getQuestionCorrectAnswer1 (questionCorrect1) {
    questionCorrect1 = document.querySelector('.first-quiz-correct-answer').value;
    if (questionCorrect1 === null) {
        alert("Por favor, preencha o campo de resposta.")
        questionCorrectAnswer1 = false;
    } else {
        questionCorrectAnswer1 = true;
    }
}

function getQuestionImageURL1 (questionImageURL1) {
    questionImageURL1 = document.querySelector('.first-quiz-image-URL').value;
    if ((questionImageURL1 !== null) &&  (questionImageURL1.startsWith("https://") || questionImageURL1.startsWith("http://"))) {
        questionCorrectImageURL1 = true;
    } else {
        alert("Por favor, insira uma URL válida para a imagem da questão.");
        questionCorrectImageURL1 = false;
    }
}

function getQuestionIncorrectAnswers1 (questionIncorrect11, questionIncorrect12, questionIncorrect13, questionIncorrectURL11, questionIncorrectURL12, questionIncorrectURL13) {
    questionIncorrect11 = document.querySelector('.first-quiz-incorrect-answer-1').value;
    questionIncorrect12 = document.querySelector('.first-quiz-incorrect-answer-2').value;
    questionIncorrect13 = document.querySelector('.first-quiz-incorrect-answer-3').value;
    questionIncorrectURL11 = document.querySelector('.first-quiz-incorrect-URL-1').value;
    questionIncorrectURL12 = document.querySelector('.first-quiz-incorrect-URL-2').value;
    questionIncorrectURL13 = document.querySelector('.first-quiz-incorrect-URL-3').value;

    if ((questionIncorrectURL11 !== null) &&  (questionIncorrectURL11.startsWith("https://") || questionIncorrectURL11.startsWith("http://"))) {
        if ((questionIncorrectURL12 === null) || (questionIncorrectURL12.startsWith("https://") || questionIncorrectURL12.startsWith("http://"))) {
            if ((questionIncorrectURL13 === null) || (questionIncorrectURL13.startsWith("https://") || questionIncorrectURL13.startsWith("http://"))) {
                if (questionIncorrect11 !== null) {
                    questionIncorrectCorrect1 = true;
                } else {
                    alert("Por favor, insira pelo menos uma resposta incorreta e sua respectiva URL de imagem.")
                    questionIncorrectCorrect1 = false;
                }
            }
        }
    }
}

function makeSecondQuestion () {
    secondQuestion = document.querySelector('.second-question-info').style.display = 'block';
}


function getQuestionText2 (questionText2) {
    questionText2 = document.querySelector('.second-quiz-text').value;
    if ((questionText2 === null) || (questionText2.length < 20)) {
        alert("Por favor, insira uma pergunta que contenha pelo menos 20 caracteres.")
        questionCorrectText2 = false;
    } else {
        questionCorrectText2 = true;
    }
}

function getQuestionBackground2 (questionBackground2) {
    questionBackground2 = document.querySelector('.second-question-background').value;
    if ((questionBackground2 !== null) && (questionBackground2.startsWith("#")) && ((questionBackground2.length === 7))) {
        questionCorrectBackground2 = true;
    } else {
        alert("Por favor, insira uma coloração hexadecimal válida.");
        questionCorrectBackground2 = false;
    }
}

function getQuestionCorrectAnswer2 (questionCorrect2) {
    questionCorrect2 = document.querySelector('.second-quiz-correct-answer').value;
    if (questionCorrect2 === null) {
        alert("Por favor, preencha o campo de resposta.")
        questionCorrectAnswer2 = false;
    } else {
        questionCorrectAnswer2 = true;
    }
}

function getQuestionImageURL2 (questionImageURL2) {
    questionImageURL2 = document.querySelector('.second-quiz-image-URL').value;
    if ((questionImageURL2 !== null) &&  (questionImageURL2.startsWith("https://") || questionImageURL2.startsWith("http://"))) {
        questionCorrectImageURL2 = true;
    } else {
        alert("Por favor, insira uma URL válida para a imagem da questão.");
        questionCorrectImageURL2 = false;
    }
}

function getQuestionIncorrectAnswers2 (questionIncorrect21, questionIncorrect22, questionIncorrect23, questionIncorrectURL21, questionIncorrectURL22, questionIncorrectURL23) {
    questionIncorrect21 = document.querySelector('.second-quiz-incorrect-answer-1').value;
    questionIncorrect22 = document.querySelector('.second-quiz-incorrect-answer-2').value;
    questionIncorrect23 = document.querySelector('.second-quiz-incorrect-answer-3').value;
    questionIncorrectURL21 = document.querySelector('.second-quiz-incorrect-URL-1').value;
    questionIncorrectURL22 = document.querySelector('.second-quiz-incorrect-URL-2').value;
    questionIncorrectURL23 = document.querySelector('.second-quiz-incorrect-URL-3').value;

    if ((questionIncorrectURL21 !== null) &&  (questionIncorrectURL21.startsWith("https://") || questionIncorrectURL21.startsWith("http://"))) {
        if ((questionIncorrectURL22 === null) || (questionIncorrectURL22.startsWith("https://") || questionIncorrectURL22.startsWith("http://"))) {
            if ((questionIncorrectURL23 === null) || (questionIncorrectURL23.startsWith("https://") || questionIncorrectURL23.startsWith("http://"))) {
                if (questionIncorrect21 !== null) {
                    questionIncorrectCorrect2 = true;
                } else {
                    alert("Por favor, insira pelo menos uma resposta incorreta e sua respectiva URL de imagem.")
                    questionIncorrectCorrect2 = false;
                }
            }
        }
    }
}

function makeThirdQuestion () {
    thirdQuestion = document.querySelector('.third-question-info').style.display = 'block';
}

function getQuestionText3 (questionText3) {
    questionText3 = document.querySelector('.third-quiz-text').value;
    if ((questionText3 === null) || (questionText3.length < 20)) {
        alert("Por favor, insira uma pergunta que contenha pelo menos 20 caracteres.")
        questionCorrectText3 = false;
    } else {
        questionCorrectText3 = true;
    }
}

function getQuestionBackground3 (questionBackground3) {
    questionBackground3 = document.querySelector('.third-question-background').value;
    if ((questionBackground3 !== null) && (questionBackground3.startsWith("#")) && ((questionBackground3.length === 7))) {
        questionCorrectBackground3 = true;
    } else {
        alert("Por favor, insira uma coloração hexadecimal válida.");
        questionCorrectBackground3 = false;
    }
}

function getQuestionCorrectAnswer3 (questionCorrect3) {
    questionCorrect3 = document.querySelector('.third-quiz-correct-answer').value;
    if (questionCorrect3 === null) {
        alert("Por favor, preencha o campo de resposta.")
        questionCorrectAnswer3 = false;
    } else {
        questionCorrectAnswer3 = true;
    }
}

function getQuestionImageURL3 (questionImageURL3) {
    questionImageURL3 = document.querySelector('.third-quiz-image-URL').value;
    if ((questionImageURL3 !== null) &&  (questionImageURL3.startsWith("https://") || questionImageURL3.startsWith("http://"))) {
        questionCorrectImageURL3 = true;
    } else {
        alert("Por favor, insira uma URL válida para a imagem da questão.");
        questionCorrectImageURL3 = false;
    }
}

function getQuestionIncorrectAnswers3 (questionIncorrect31, questionIncorrect32, questionIncorrect33, questionIncorrectURL31, questionIncorrectURL32, questionIncorrectURL33) {
    questionIncorrect31 = document.querySelector('.third-quiz-incorrect-answer-1').value;
    questionIncorrect32 = document.querySelector('.third-quiz-incorrect-answer-2').value;
    questionIncorrect33 = document.querySelector('.third-quiz-incorrect-answer-3').value;
    questionIncorrectURL31 = document.querySelector('.third-quiz-incorrect-URL-1').value;
    questionIncorrectURL32 = document.querySelector('.third-quiz-incorrect-URL-2').value;
    questionIncorrectURL33 = document.querySelector('.third-quiz-incorrect-URL-3').value;

    if ((questionIncorrectURL31 !== null) &&  (questionIncorrectURL31.startsWith("https://") || questionIncorrectURL31.startsWith("http://"))) {
        if ((questionIncorrectURL32 === null) || (questionIncorrectURL32.startsWith("https://") || questionIncorrectURL32.startsWith("http://"))) {
            if ((questionIncorrectURL33 === null) || (questionIncorrectURL33.startsWith("https://") || questionIncorrectURL33.startsWith("http://"))) {
                if (questionIncorrect31 !== null) {
                    questionIncorrectCorrect3 = true;
                } else {
                    alert("Por favor, insira pelo menos uma resposta incorreta e sua respectiva URL de imagem.")
                    questionIncorrectCorrect3 = false;
                }
            }
        }
    }
}

//Botão: Adquire perguntas, e pula para a quarta página (Criação de Níveis)

function getQuestionsInfo () {
    getQuestionText1(), getQuestionText2(), getQuestionText3;
    getQuestionBackground1(), getQuestionBackground2(), getQuestionBackground3();
    getQuestionCorrectAnswer1(), getQuestionCorrectAnswer2(), getQuestionCorrectAnswer3();
    getQuestionImageURL1(), getQuestionImageURL2(), getQuestionImageURL3();
    getQuestionIncorrectAnswers1(), getQuestionIncorrectAnswers2(), getQuestionIncorrectAnswers3();

    if ((questionCorrectText1 === true) && (questionCorrectBackground1 === true) && (questionCorrectAnswer1 === true) && (questionCorrectImageURL1 === true) &&
    (QuestionCorrectText2 === true) && (questionCorrectBackground2 === true) && (questionCorrectAnswer2 === true) && (questionCorrectImageURL2 === true) &&
    (questionCorrectText3 === true) && (questionCorrectBackground3 === true) && (questionCorrectAnswer3 === true) && (questionCorrectImageURL3 === true) &&
    (questionIncorrectCorrect1 === true) && (questionIncorrectCorrect2 === true) && (questionIncorrectCorrect3 === true)) {
        let currentPage = document.querySelector('.main-4');
        let lastPage = document.querySelector('.main-3');
        if (lastPage.style.display !== 'none') {    
            currentPage.style.display = 'block';
            lastPage.style.display = 'none';
        }
    }
}