//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
let indexAnswer = 0;
let indexScroll = 0;
let userAnswers = [];
let chosenQuiz;
let quizCreatedTitle, quizCreatedURL, quizCreatedNumberOfQuestions, quizCreatedNumOfLevels = null;
let quizCorrectTitle, quizCorrectURL, quizCorrectNumOfQuestions, quizCorrectNumOfLevels = null;
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
let levelTitle1, levelPercentage1, levelImageURL1, levelDescription1 = null;
let levelTitle2, levelPercentage2, levelImageURL2, levelDescription2= null;
let levelTitle3, levelPercentage3, levelImageURL3, levelDescription3= null;
let levelCorrectLevelTitle1, levelCorrectPercentage1, levelCorrectURL1, levelCorrectDescription1 = null;
let levelCorrectLevelTitle2, levelCorrectPercentage2, levelCorrectURL2, levelCorrectDescription2 = null;
let levelCorrectLevelTitle3, levelCorrectPercentage3, levelCorrectURL3, levelCorrectDescription3 = null;
let levelRequirement = null;
let postQuizTitle, postQuizURL, postQuizNOQ, postQuizNOL = null;
let postQuizText1, postQuizText2, postQuizText3 = null;
let postQuizBG1, postQuizBG2, postQuizBG3 = null;
let postQuizCA1, postQuizCA2, postQuizCA3 = null;
let postQuizQIURL1, postQuizQIURL2, postQuizQIURL3 = null;
let postQuizIncText11, postQuizIncText12, postQuizIncText13 = null;
let postQuizIncText21, postQuizIncText22, postQuizIncText23 = null;
let postQuizIncText31, postQuizIncText32, postQuizIncText33 = null;
let postQuizIncURL11, postQuizIncURL12, postQuizIncURL13 = null;
let postQuizIncURL21, postQuizIncURL22, postQuizIncURL23 = null;
let postQuizIncURL31, postQuizIncURL32, postQuizIncURL33 = null;
let postQuizLTitle1, postQuizLTitle2, postQuizLTitle3 = null;
let postQuizLPercentage1, postQuizLPercentage2, postQuizLPercentage3 = null;
let postQuizLIURL1, postQuizLIURL2, postQuizLIURL3 = null;
let postQuizLDescription1, postQuizLDescription2, postQuizLDescription3 = null;
let createdQuiz = null;
const createdQuiz = {
    title: postQuizTitle,
    image: postQuizURL,
    questions: [
        {
            title: postQuizText1,
            color: postQuizBG1,
            answers: [
                {
                    text: postQuizCA1,
                    image: postQuizQIURL1,
                    isCorrectAnswer: true
                },
                {
                    text: postQuizIncText11,
                    image: postQuizIncURL11,
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: postQuizText2,
            color: postQuizBG2,
            answers: [
                {
                    text: postQuizCA2,
                    image: postQuizQIURL2,
                    isCorrectAnswer: true
                },
                {
                    text: postQuizIncText21,
                    image: postQuizIncURL21,
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: postQuizText3,
            color: postQuizBG2,
            answers: [
                {
                    text: postQuizCA3,
                    image: postQuizQIURL3,
                    isCorrectAnswer: true
                },
                {
                    text: postQuizIncText31,
                    image: postQuizIncURL31,
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [
        {
            title: postQuizLTitle1,
            image: postQuizLIURL1,
            text: postQuizLDescription1,
            minValue: postQuizLPercentage1
        },
        {
            title: postQuizLTitle2,
            image: postQuizLIURL2,
            text: postQuizLDescription2,
            minValue: postQuizLPercentage2
        }
    ]
};

function renderMain1(){
    const main = document.querySelector('.main');
    main.innerHTML += `
    <section class="main-1">
        <section class="first-page">
            <section class="main-upper">
                <section class="page-upper-body">
                    <div class="new-quiz-container"> 
                        <div class="first-quiz-message">
                            <p class="quiz-null">Você não criou nenhum quiz ainda :(</p>
                            <button type="button" class="create-quiz" onclick="insertSecondPage()">Criar Quiz</button>
                        </div>
                    </div>
                </section>
            </section>
            <section class="main-middle">
                <div class="quizzes">
                    <p class="all-quizzes">Todos os Quizzes</p>     
                </div>
                <section class="page-middle-body">  
                    <div class="show-quizzes"></div>
                </section>
            </section>
        </section>
    </section>`;
}

function renderMain2(){
    const main = document.querySelector('.main');
    main.innerHTML += `
    <section class="main-2">        
        <section class="second-page">
            <section class="quiz-info-page-title">   
                <p class="second-page-title">Comece pelo começo</p>
            </section>
            <section class="quiz-info-list">    
                <input type="text" class="quiz-title" placeholder="Titulo do seu quiz">
                <input type="text" class="quiz-image-url" placeholder="URL da imagem do seu quiz">
                <input type="text" class="quiz-number-of-questions" placeholder="Quantidade de perguntas dos seu quiz">
                <input type="text" class="quiz-number-of-levels" placeholder="Quantidade de níveis do quiz">
            </section>
            <section class="make-questions-button">     
                <button type="button" class="go-make-questions" onclick="getQuizBasicInfo()">Prosseguir para criar perguntas</button>
            </section> 
        </section>
    </section>`;
}

function renderMain3(){
    const main = document.querySelector('.main');
    main.innerHTML += `
    <section class="main-3">    
        <section class="third-page">
            <section class="quiz-questions-page-title">
                <p class="third-page-title">Crie suas perguntas</p>
            </section>
            <section class="first-question">    
                <div class="first-question-info" data-identifier="question">
                    <p class="question-1">Pergunta 1</p>
                    <input type="text" class="first-quiz-text" placeholder="Texto da pergunta">
                    <input type="text" class="first-question-background" placeholder="Cor de fundo da pergunta">
                </div>
                <div class="first-question-correct-answer">
                    <p class="correct-answer-1">Resposta correta</p>
                    <input type="text" class="first-quiz-correct-answer" placeholder="Resposta correta">
                    <input type="text" class="first-quiz-image-URL" placeholder="URL da imagem">
                </div>
                <div class="first-quiz-incorrect-answers">
                    <p class="incorrect-answers-1">Respostas incorretas</p>
                    <p>
                        <input type="text" class="first-quiz-incorrect-answer-1" placeholder="Resposta incorreta 1">
                        <input type="text" class="first-quiz-incorrect-URL-1" placeholder="URL da imagem 1">
                    </p>
                    <p>
                        <input type="text" class="first-quiz-incorrect-answer-2" placeholder="Resposta incorreta 2">
                        <input type="text" class="first-quiz-incorrect-URL-2" placeholder="URL da imagem 2">
                    </p>
                    <p>
                        <input type="text" class="first-quiz-incorrect-answer-3" placeholder="Resposta incorreta 3">
                        <input type="text" class="first-quiz-incorrect-URL-3" placeholder="URL da imagem 3">
                    </p>
                </div>
            </section>
            <section class="second-question" data-identifier="question">  
                <button type ="button" class="make-second-question" onclick = "makeSecondQuestion()" data-identifier="expand"></button>
                <div class="second-question-info">
                    <p class="question-2">Pergunta 2</p>
                    <input type="text" class="second-quiz-text" placeholder="Texto da pergunta">
                    <input type="text" class="second-question-background" placeholder="Cor de fundo da pergunta">
                </div>
                <div class="second-question-correct-answer">
                    <p class="correct-answer-2">Resposta correta</p>
                    <input type="text" class="second-quiz-correct-answer" placeholder="Resposta correta">
                    <input type="text" class="second-quiz-image-URL" placeholder="URL da imagem">
                </div>
                <div class="second-quiz-incorrect-answers">
                    <p class="incorrect-answers-2">Respostas incorretas</p>
                    <p>
                        <input type="text" class="second-quiz-incorrect-answer-1" placeholder="Resposta incorreta 1">
                        <input type="text" class="second-quiz-incorrect-URL-1" placeholder="URL da imagem 1">
                    </p>
                    <p>
                        <input type="text" class="second-quiz-incorrect-answer-2" placeholder="Resposta incorreta 2">
                        <input type="text" class="second-quiz-incorrect-URL-2" placeholder="URL da imagem 2">
                    </p>
                    <p>
                        <input type="text" class="second-quiz-incorrect-answer-3" placeholder="Resposta incorreta 3">
                        <input type="text" class="second-quiz-incorrect-URL-3" placeholder="URL da imagem 3">
                    </p>
                </div>
            </section>
            <section class="third-question">       
                <button type ="button" class="make-third-question" onclick = "makeThirdQuestion()" data-identifier="expand"></button>
                <div class="third-question-info">
                    <p class="question-3">Pergunta 3</p>
                    <input type="text" class="third-quiz-text" placeholder="Texto da pergunta">
                    <input type="text" class="third-question-background" placeholder="Cor de fundo da pergunta">
                </div>
                <div class="third-question-correct-answer">
                    <p class="correct-answer-3">Resposta correta</p>
                    <input type="text" class="third-quiz-correct-answer" placeholder="Resposta correta">
                    <input type="text" class="third-quiz-image-URL" placeholder="URL da imagem">
                </div>
                <div class="third-quiz-incorrect-answers">
                    <p class="incorrect-answers-3">Respostas incorretas</p>
                    <p>
                        <input type="text" class="third-quiz-incorrect-answer-1" placeholder="Resposta incorreta 1">
                        <input type="text" class="third-quiz-incorrect-URL-1" placeholder="URL da imagem 1">
                    </p>
                    <p>
                        <input type="text" class="third-quiz-incorrect-answer-2" placeholder="Resposta incorreta 2">
                        <input type="text" class="third-quiz-incorrect-URL-2" placeholder="URL da imagem 2">
                    </p>
                    <p>
                        <input type="text" class="third-quiz-incorrect-answer-3" placeholder="Resposta incorreta 3">
                        <input type="text" class="third-quiz-incorrect-URL-3" placeholder="URL da imagem 3">
                    </p>
                </div>
            </section>
            <section class="make-levels-button">    
                <button type="button" class="go-make-levels" onclick="getQuestionsInfo()">Prosseguir pra criar níveis</button>
            </section>
        </section>
    </section>`;
}

function renderMain4(){
    const main = document.querySelector('.main');
    main.innerHTML += `
    <section class="main-4">
        <section class="fourth-page">
            <section class="quiz-levels-page-title">
                <p class="fourth-page-title">Agora, decida os níveis!</p>
            </section>
            <section class="first-level">    
                <div class="first-level-info" data-identifier="level">
                    <p class="level-1">Nível 1</p>
                    <input type="text" class="first-level-title-1" placeholder="Título do nível">
                    <input type="text" class="first-level-percentage-1" placeholder="% de acerto mínima">
                    <input type="text" class="first-level-image-URL-1" placeholder="URL da imagem no nível">
                    <input type="text" class="first-level-description-1" placeholder="Descrição do nível">
                </div>
            </section>
            <section class="second-level">
                <button type ="button" class="make-second-level" onclick = "makeSecondLevel()" data-identifier="expand"></button>    
                <div class="second-level-info" data-identifier="level">
                    <p class="level-2">Nível 2</p>
                    <input type="text" class="second-level-title-2" placeholder="Título do nível">
                    <input type="text" class="second-level-percentage-2" placeholder="% de acerto mínima">
                    <input type="text" class="second-level-image-URL-2" placeholder="URL da imagem no nível">
                    <input type="text" class="second-level-description-2" placeholder="Descrição do nível">
                </div>
            </section>
            <section class="third-level">   
                <button type ="button" class="make-third-level" onclick = "makeThirdLevel()" data-identifier="expand"></button> 
                <div class="third-level-info" data-identifier="level">
                    <p class="level-3">Nível 3</p>
                    <input type="text" class="third-level-title-3" placeholder="Título do nível">
                    <input type="text" class="third-level-percentage-3" placeholder="% de acerto mínima">
                    <input type="text" class="third-level-image-URL-3" placeholder="URL da imagem no nível">
                    <input type="text" class="third-level-description-3" placeholder="Descrição do nível">
                </div>
            </section>
            <section class="make-access-quiz-button">    
                <button type="button" class="go-access-quiz" onclick="getLevelsInfo()">Finalizar Quizz</button>
            </section>
        </section>
    </section>`;
}

function renderMain5(){
    const main = document.querySelector('.main');
    main.innerHTML += `
    <section class="main-5">
        <section class="fifth-page">
            <section class="success-quiz-page-title">
                <p class="fifth-page-title">Seu quizz está pronto!</p>
            </section>
            <section class="finished-quiz-picture">
                <div class="final-quiz-image-block">
                    <img src="${quizCreatedURL}">
                    <p>${quizCreatedTitle}</p>
                </div>
            </section>
            <section>
                <button type="button" class="quiz-access" onclick="quizAccess()">Acessar Quizz</button>
                <button type="button" class="go-back-home" onclick="backHome()">Voltar pra home</button>
            </section>
        </section>
    </section>
    `;
}

function loadQuiz(){
    renderMain1();
    renderMain2();
    renderMain3();
    renderMain4();
    renderMain5();

    document.querySelector('.show-quizzes').innerHTML = '<section class="page-body"></section>';
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
    let answer = document.querySelector(`#${object.id} > .title-answer`).innerHTML;
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
                    answer = '';
                }
            }
        }
        if(userAnswers.length === questions.length){
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
    let column = [], sortedIndex;
    for(let a = 0; a < question.answers.length; a++){
        column.push(a);
    }
    for(let j in question.answers){
        let aux = parseInt(j);
        if((question.answers.length%2 === 0) && (question.answers.length > 2)){
            if(aux === (question.answers.length/2)){
                renderSingle += `</div><div class='answers-row' id='row-${rowIndexer}'>`;
            }
        }
        sortedIndex = column[Math.floor((Math.random() * column.length))];
        column.splice(column.indexOf(sortedIndex), 1);
        renderSingle += `
        <div class='single-answer' onclick='isCorrect(this, ${object.id});' id='answer-${indexAnswer}'>
            <img src='${question.answers[sortedIndex].image}' alt='Imagem não carregada.'>
            <div class='title-answer'>${question.answers[sortedIndex].text}</div>
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
        postQuizTitle = quizCreatedTitle;
    }
}

function getQuizURL (quizCreatedURL) {
    quizCreatedURL = document.querySelector('.quiz-image-url').value;
    console.log(quizCreatedURL);
    if ((quizCreatedURL !== null) &&  (quizCreatedURL.startsWith("https://") || quizCreatedURL.startsWith("http://"))) {
        quizCorrectURL = true;
        postQuizURL = quizCreatedURL;
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
        postQuizNOQ = quizCreatedNumberOfQuestions;
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
        postQuizNOL = quizCreatedNumberOfLevels;
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
        postQuizText1 = questionText1;
    }
}

function getQuestionBackground1 (questionBackground1) {
    questionBackground1 = document.querySelector('.first-question-background').value;
    if ((questionBackground1 !== null) && (questionBackground1.startsWith("#")) && ((questionBackground1.length === 7))) {
        questionCorrectBackground1 = true;
        postQuizBG1 = questionBackground1;
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
        postQuizCA1 = questionCorrect1;
    }
}

function getQuestionImageURL1 (questionImageURL1) {
    questionImageURL1 = document.querySelector('.first-quiz-image-URL').value;
    if ((questionImageURL1 !== null) &&  (questionImageURL1.startsWith("https://") || questionImageURL1.startsWith("http://"))) {
        questionCorrectImageURL1 = true;
        postQuizQIURL1 = questionImageURL1;
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
                    postQuizIncText11 = questionIncorrect11;
                    postQuizIncText12 = questionIncorrect12;
                    postQuizIncText13 = questionIncorrect13;
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
        postQuizText2 = questionText2;
    }
}

function getQuestionBackground2 (questionBackground2) {
    questionBackground2 = document.querySelector('.second-question-background').value;
    if ((questionBackground2 !== null) && (questionBackground2.startsWith("#")) && ((questionBackground2.length === 7))) {
        questionCorrectBackground2 = true;
        postQuizBG2 = questionBackground2;
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
        postQuizCA2 = questionCorrect2;
    }
}

function getQuestionImageURL2 (questionImageURL2) {
    questionImageURL2 = document.querySelector('.second-quiz-image-URL').value;
    if ((questionImageURL2 !== null) &&  (questionImageURL2.startsWith("https://") || questionImageURL2.startsWith("http://"))) {
        questionCorrectImageURL2 = true;
        postQuizQIURL2 = questionImageURL2;
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
                    postQuizIncText21 = questionIncorrect21;
                    postQuizIncText22 = questionIncorrect22;
                    postQuizIncText23 = questionIncorrect23;
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
        postQuizText3 = questionText3;
    }
}

function getQuestionBackground3 (questionBackground3) {
    questionBackground3 = document.querySelector('.third-question-background').value;
    if ((questionBackground3 !== null) && (questionBackground3.startsWith("#")) && ((questionBackground3.length === 7))) {
        questionCorrectBackground3 = true;
        postQuizBG3 = questionBackground3;
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
        postQuizCA3 = questionCorrect3;
    }
}

function getQuestionImageURL3 (questionImageURL3) {
    questionImageURL3 = document.querySelector('.third-quiz-image-URL').value;
    if ((questionImageURL3 !== null) &&  (questionImageURL3.startsWith("https://") || questionImageURL3.startsWith("http://"))) {
        questionCorrectImageURL3 = true;
        postQuizQIURL3 = questionImageURL3;
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
                    postQuizIncText31 = questionIncorrect31;
                    postQuizIncText32 = questionIncorrect32;
                    postQuizIncText33 = questionIncorrect33;
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
        //make-post
        let currentPage = document.querySelector('.main-4');
        let lastPage = document.querySelector('.main-3');
        if (lastPage.style.display !== 'none') {    
            currentPage.style.display = 'block';
            lastPage.style.display = 'none';
        }
    }
}

// Cria os níveis do Quiz

function getLevelTitle1 (levelTitle1) {
    levelTitle1 = document,querySelector('.first-level-title-1').value;
    if ((levelTitle1 === null) || (levelTitle1.length < 10)) {
        alert("Por favor, insira um título de nível com pelo menos 10 caracteres.")
        levelCorrectLevelTitle1 = false;
    } else {
        levelCorrectLevelTitle1 = true;
        postQuizLTitle1 = levelTitle1;
    }
}

function getLevelPercentage1 (levelPercentage1) {
    levelPercentage1 = document,querySelector('.first-level-percentage-1').value;
    if ((levelPercentage1 !== null) && (isNaN(levelPercentage1)) && (levelPercentage1 >= 0) && (levelPercentage1 <= 100)) {
        levelCorrectPercentage1 = true;
        postQuizLPercentage1 = levelPercentage1;
    } else {
        alert("Por favor, insira uma porcentagem válida, entre 0 e 100.");
        levelCorrectPercentage1 = false;
    }
}

function getLevelImageURL1 (levelImageURL1) {
    levelImageURL1 = document.querySelector('.first-level-image-URL-1').value;
    if ((levelImageURL1 !== null) &&  (levelImageURL1.startsWith("https://") || levelImageURL1.startsWith("http://"))) {
        levelCorrectURL1 = true;
        postQuizLIURL1 = levelImageURL1;
    } else {
        alert("Por favor, insira uma URL válida para a imagem do nível.");
        levelCorrectURL1 = false;
    }
}

function getLevelDescription1 (levelDescription1) {
    levelDescription1 = document.querySelector('.first-level-description-1').value;
    if ((levelDescription1 === null) || (levelDescription1.length < 30)) {
        alert("Por favor, insira uma descrição para o nível, que possua pelo menos 30 caracteres.");
        levelCorrectDescription1 = false;
    } else {
        levelCorrectDescription1 = true;
        postQuizLDescription1 = levelDescription1;
    }
}

function getLevelTitle2 (levelTitle2) {
    levelTitle2 = document,querySelector('.second-level-title-2').value;
    if ((levelTitle2 === null) || (levelTitle2.length < 10)) {
        alert("Por favor, insira um título de nível com pelo menos 10 caracteres.")
        levelCorrectLevelTitle2 = false;
    } else {
        levelCorrectLevelTitle2 = true;
        postQuizLTitle2 = levelTitle2;
    }
}

function getLevelPercentage2 (levelPercentage2) {
    levelPercentage2 = document,querySelector('.second-level-percentage-2').value;
    if ((levelPercentage2 !== null) && (isNaN(levelPercentage2)) && (levelPercentage2 >= 0) && (levelPercentage2 <= 100)) {
        levelCorrectPercentage2 = true;
        postQuizLPercentage2 = levelPercentage2;
    } else {
        alert("Por favor, insira uma porcentagem válida, entre 0 e 100.");
        levelCorrectPercentage2 = false;
    }
}

function getLevelImageURL2 (levelImageURL2) {
    levelImageURL2 = document.querySelector('.second-level-image-URL-2').value;
    if ((levelImageURL2 !== null) &&  (levelImageURL2.startsWith("https://") || levelImageURL2.startsWith("http://"))) {
        levelCorrectURL2 = true;
        postQuizLIURL2 = levelImageURL2;
    } else {
        alert("Por favor, insira uma URL válida para a imagem do nível.");
        levelCorrectURL2 = false;
    }
}

function getLevelDescription2 (levelDescription2) {
    levelDescription2 = document.querySelector('.second-level-description-2').value;
    if ((levelDescription2 === null) || (levelDescription2.length < 30)) {
        alert("Por favor, insira uma descrição para o nível, que possua pelo menos 30 caracteres.");
        levelCorrectDescription2 = false;
    } else {
        levelCorrectDescription2 = true;
        postQuizLDescription2 = levelDescription2;
    }
}

function getLevelTitle3 (levelTitle3) {
    levelTitle3 = document,querySelector('.third-level-title-3').value;
    if ((levelTitle3 === null) || (levelTitle3.length < 10)) {
        alert("Por favor, insira um título de nível com pelo menos 10 caracteres.")
        levelCorrectLevelTitle3 = false;
    } else {
        levelCorrectLevelTitle3 = true;
        postQuizLTitle3 = levelTitle3;
    }
}

function getLevelPercentage3 (levelPercentage3) {
    levelPercentage3 = document,querySelector('.third-level-percentage-3').value;
    if ((levelPercentage3 !== null) && (isNaN(levelPercentage3)) && (levelPercentage3 >= 0) && (levelPercentage3 <= 100)) {
        levelCorrectPercentage3 = true;
        postQuizLPercentage3 = levelPercentage3;
    } else {
        alert("Por favor, insira uma porcentagem válida, entre 0 e 100.");
        levelCorrectPercentage3 = false;
    }
}

function getLevelImageURL3 (levelImageURL3) {
    levelImageURL3 = document.querySelector('.third-level-image-URL-3').value;
    if ((levelImageURL3 !== null) &&  (levelImageURL3.startsWith("https://") || levelImageURL3.startsWith("http://"))) {
        levelCorrectURL3 = true;
        postQuizLIURL3 = levelImageURL3;
    } else {
        alert("Por favor, insira uma URL válida para a imagem do nível.");
        levelCorrectURL3 = false;
    }
}

function getLevelDescription3 (levelDescription3) {
    levelDescription3 = document.querySelector('.third-level-description-3').value;
    if ((levelDescription3 === null) || (levelDescription3.length < 30)) {
        alert("Por favor, insira uma descrição para o nível, que possua pelo menos 30 caracteres.");
        levelCorrectDescription3 = false;
    } else {
        levelCorrectDescription3 = true;
        postQuizLDescription3 = levelDescription3;
    }
}

function getLevelRequirements (levelPercentage1, levelPercentage2, levelPercentage3) {
    levelPercentage1 = document.querySelector('.first-level-percentage-1').value;
    levelPercentage2 = document.querySelector('.second-level-percentage-2').value;
    levelPercentage3 = document.querySelector('.third-level-percentage-3'). value;
    if ((levelPercentage1 === 0) || (levelPercentage2 === 0) || (levelPercentage3 === 0)){
        levelRequirement = true;
    }
}

function getLevelsInfo () {
    getLevelTitle1(), getLevelTitle2(), getLevelTitle3(), getLevelPercentage1(), getLevelPercentage2(),
    getLevelPercentage3(), getLevelImageURL1(), getLevelImageURL2(), getLevelImageURL3(), getLevelDescription1(),
    getLevelDescription2(), getLevelDescription3();

    if ((levelCorrectLevelTitle1 === true) && (levelCorrectLevelTitle2 === true) && (levelCorrectLevelTitle3 === true) &&
    (levelCorrectPercentage1 === true) && (levelCorrectPercentage2 === true) && (levelCorrectPercentage3 === true) &&
    (levelCorrectURL1 === true) && (levelCorrectURL2 === true) && (levelCorrectURL3 === true) && (levelCorrectDescription1 === true) &&
    (levelCorrectDescription2 === true) && (levelCorrectDescription3 === true) && (levelRequirement === true)){
        let currentPage = document.querySelector('.main-5');
        let lastPage = document.querySelector('.main-4');
        if (lastPage.style.display !== 'none') {    
            currentPage.style.display = 'block';
            lastPage.style.display = 'none';
        }
    }
}

// Envio do Quiz para a API(servidor)

function quizUpload (createdQuiz) {
    const sendQuiz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", createdQuiz);
}

// Última tela, de acesso ao Quiz

function quizAccess () {
    //go to created quiz
}
