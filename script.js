//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ -> obter um só quiz
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes -> criar um quiz
//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
let indexAnswer = 0;
let indexScroll = 0;
let userAnswers = [];
let quizCreatedTitle = null;
let quizCreatedURL = null;
let quizCreatedNumberOfQuestions = null;
let quizCreatedNumberOfLevels = null;
let quizCorrectTitle = null;
let quizCorrectURL = null;
let quizCorrectNumOfQuestions = null;
let quizCorrectNumOfLevels = null;

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
    const request = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${object.id}`);
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
                <div class='container-answers'>
                    <div class='answers-row'>${renderSingleAnswer(questions[i], object)}</div>
                </div></div>`;
            document.querySelectorAll('.quiz-question')[i].style.background = questions[i].color;
        }
        main.innerHTML += `</div>`;
    }).catch((error) => {
        console.log(error);
    });
}

function isCorrect(object, id){
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
                        removeClickEvent(object.parentNode);
                        correctAnswer(object.parentNode, object);
                    }else{
                        setTimeout(() => {
                            const selector = document.querySelector(`#answer-${indexScroll}`);
                            if(selector !== undefined){
                                selector.scrollIntoView();
                            }
                        }, 2000);
                        removeClickEvent(object.parentNode);
                        wrongAnswers(object.parentNode, answers[i], object.id);
                    }
                    userAnswers.push(answers[i][j].isCorrectAnswer);
                }
            }
        }
        console.log(userAnswers);
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

function renderSingleAnswer(question, object){
    let renderSingle = '';
    for(let j in question.answers){
        let aux = parseInt(j);
        if((question.answers.length%2 === 0) && (question.answers.length > 2)){
            if(aux === (question.answers.length/2)){
                renderSingle += `</div><div class='answers-row'>`;
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

function removeClickEvent(parentObject){
    const children = parentObject.children;
    for(let i = 0; i < children.length; i++){
        children[i].removeAttribute('onclick');
    }
}

function correctAnswer(parentObject, object){
    const children = parentObject.children;
    for(let i = 0; i < children.length; i++){
        if(children[i].id !== object.id){
            children[i].classList.add('wrong-answer');
        }else{
            object.classList.add('correct-answer');
        }
    }
}

function wrongAnswers(parentObject, answers, objectId){
    const children = parentObject.children;
    let answerOptions = [];
    for(let i=0; i < children.length; i++){
        answerOptions.push(document.querySelector(`#${children[i].id} > .title-answer`).innerHTML);
    }
    for(let i in answers){
        if(children[i].id !== objectId){
            children[i].style.opacity = '0.6';
        }
        for(let j=0; j < answerOptions.length; j++){
            if(answerOptions[j] === answers[i].text){
                if(answers[i].isCorrectAnswer){
                    children[j].style.color = 'green';
                }else{
                    children[j].style.color = 'red';
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
    const score = (Math.ceil(pontuation/questionsLength))*100;
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
        <div class='reset-button'><button onclick='restartQuiz(this);' value='${2245}'>Reiniciar quiz</button></div>
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

//Botão: Inicia a criação do primeiro Quiz

function insertSecondPage() {
    let currentPage = document.querySelector('.main-2');
    let lastPage = document.querySelector('.main-1');
    if (lastPage.style.display !== 'none') {    
        currentPage.style.display = 'block';
        lastPage.style.display = 'none';
    }
} 

//Inicia criação de um Quiz


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

function getQuizInfo () {
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

