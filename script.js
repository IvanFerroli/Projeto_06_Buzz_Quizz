//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ -> obter um só quiz
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes -> criar um quiz
//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
let indexAnswer = 0;
let indexScroll = 0;
let quizCreatedTitle = null;
let quizCreatedURL = null;
let quizCreatedNumberOfQuestions = null;
let quizCreatedNumberOfLevels = null;
let quizCorrectTitle = null;
let quizCorrectURL = null;
let quizCorrectNumOfQuestions = null;
let quizCorrectNumOfLevels = null;

function loadQuiz(){
    const request = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    request.then((response) => {
        const quizes = document.querySelector('.page-body');
        for(let i in response.data){
            quizes.innerHTML += `
            <div id='${response.data[i].id}' class='single-quiz' onclick='renderSingleQuiz(this);'>
                <div class='overlap'></div>
                <div class='thumb-quiz'><img src='${response.data[i].image}'></div>
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
            <img src='${response.data.image}'>
            <div class='quiz-title'>${response.data.title}</div>
        </div>`;
        for(let i in questions){
            main.innerHTML += `
                <div class='quiz-question'>${questions[i].title}</div>
                <div class='container-answers'>
                    <div class='answers-row'>${renderSingleAnswer(questions[i], object)}</div>
                </div>`;
            document.querySelectorAll('.quiz-question')[i].style.background = questions[i].color;
        }
    }).catch((error) => {
        console.log(error);
    });
}

function isCorrect(object, id){
    const answer = document.querySelector(`#${object.id} > .title-answer`).innerHTML;
    const request = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    request.then((response) => {
        const questions = response.data.questions;
        const answers = getAnswers(questions);
        for(let i in answers){
            if(answer === answers[i].text){
                if(answers[i].isCorrectAnswer){
                    //colocar as configs de css pra resposta certa aqui
                    indexScroll += answers.length;
                    console.log('correto');
                    setTimeout(() => {
                        document.querySelector(`#answer-${indexScroll}`).scrollIntoView();
                        //falta colocar um tratamento aqui
                    }, 2000);
                }else{
                    //colocar as configs de css pra resposta errada aqui 
                }
            }
        }
    }).catch((error) => {
        console.log(error);
    });
}

function getAnswers(questionAnswers){
    let answers={};
    for(let i in questionAnswers){
        answers = questionAnswers[i].answers;
    }
    return answers;
}

function renderSingleAnswer(question, object){
    let renderSingle = '';
    for(let j in question.answers){
        renderSingle += `
        <div class='single-answer' onclick='isCorrect(this, ${object.id});' id='answer-${indexAnswer}'>
            <img src='${question.answers[j].image}'>
            <div class='title-answer'>${question.answers[j].text}</div>
        </div>`;
        indexAnswer++;
    }
    return renderSingle;
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

