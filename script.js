const questions=[
    {
        question: 'Which is the largest Ocean in the world?',
        answer: [
            {text:"Atlantic",correct:false},
            {text:"Indian Ocean",correct:false},
            {text:"Pacific Ocean",correct:true},
            {text:"Arctic",correct:false},
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answer: [
            {text:"Venus",correct:false},
            {text:"Mars",correct:true},
            {text:"Jupiter",correct:false},
            {text:"saturn",correct:false},
        ]
    },
    {
        question: 'How many continents are there?',
        answer: [
            {text:"5",correct:false},
            {text:"6",correct:false},
            {text:"7",correct:true},
            {text:"8",correct:false},
        ]
    },
    {
        question: 'What is the capital of Qatar?',
        answer: [
            {text:"Manama",correct:false},
            {text:"Doha",correct:true},
            {text:"Riyadth",correct:false},
            {text:"Dubai",correct:false},
        ]
    },
    {
        question: 'Which is the smallest country in the world?',
        answer: [
            {text:"Monaco",correct:false},
            {text:"Malta",correct:false},
            {text:"San Marino",correct:false},
            {text:"Vatican City",correct:true},
        ]
    },
    {
        question: 'Who invented JavaScript?',
        answer: [
            {text:"Brenden Eich",correct:true},
            {text:"Tim Berners",correct:false},
            {text:"Bill Gates",correct:false},
            {text:"James Gosling",correct:false},
        ]
    },
    {
        question: 'What does HTML stands for?',
        answer: [
            {text:"High Text Machine Language",correct:false},
            {text:"Hyper Tabular Markup Language",correct:false},
            {text:"Hyper Text Markup Language",correct:true},
            {text:"None of these",correct:false},
        ]
    },
] ;  

const question = document.getElementById('question');
const answer_buttons = document.getElementById('answer-buttons');
const next_button = document.getElementById('next-btn');
let current_question_Index = 0;
let score = 0;

function startQuiz(){
    current_question_Index = 0;
    score = 0;
    next_button.innerHTML = "Next";
    showQuiz();
}

function showQuiz(){
   reset_answers();
   question.classList.remove('passed','failed');
   let current_question = questions[current_question_Index];
   let current_index = current_question_Index + 1;
   question.innerHTML = current_index + '- ' + current_question.question;
   current_question.answer.forEach(answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answer_buttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
   });
}
function reset_answers(){
    next_button.style.display='none';
    while(answer_buttons.firstChild){
        answer_buttons.removeChild(answer_buttons.firstChild);
    }
}
function selectAnswer(e){
    const selected_button = e.target;
    const isCorrect = selected_button.dataset.correct === 'true';
    if (isCorrect){
        selected_button.classList.add('correct');
        score++;
    }else{
        selected_button.classList.add('incorrect');
    }
    Array.from(answer_buttons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    next_button.style.display= 'block';

}
function showScore(){
    reset_answers();
    if (score >= (questions.length/2)){
        question.innerHTML = `You scored ${score} out of ${questions.length} <br>Congrats! You Passed the Quiz`;
        question.classList.add('passed');
    }else{
        question.innerHTML = `You scored ${score} out of ${questions.length} <br>Sorry! Please Try Again`;
        question.classList.add('failed');
    }

    next_button.innerHTML = 'Play Again!';
    next_button.style.display = 'block';

}
function handleNextButton(){
    current_question_Index++;
    if(current_question_Index < questions.length){
        showQuiz();
    }else{
        showScore();
    }
}
next_button.addEventListener('click',()=>{
    if(current_question_Index < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
}) 

showQuiz();