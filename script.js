//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ -> obter um só quiz
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes -> criar um quiz
//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
let indexAnswer = 0;
let indexScroll = 0;

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


function insertSecondPage() {
    let currentPage = document.querySelector('.second-page');
    let lastPage = document.querySelector('.first-page');
    if (lastPage.style.display !== 'none') {    
        currentPage.style.display = 'block';
        lastPage.style.display = 'none';
    }
}

