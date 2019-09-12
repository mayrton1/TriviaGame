const quizQuestions = [
    {
        question: "What year did man land on the moon?",
        choices: ["1964", "1978", "1955", "1969"],
        correctAnswer: "1969"
    },

    {
        question: "How many planets are in our solar system?",
        choices: ["5", "15", "8", "10"],
        correctAnswer: "8"

    },

    {
        question: "Who invented the modern rocket?",
        choices: ["Werher Von Braun", "Alan Shepard", "Robert H. Goddard", "Neil Armstrong"],
        correctAnswer: "Robert H. Goddard"

    },

    {
        question: "What was the name of the first satelite in space?",
        choices: ["Sputnik", "Explorer 1", "Voyager", "Skylab"],
        correctAnswer: "Sputnik"

    },

];

const funImages =[
    '../images/moonlanding.gif',
    '../images/planets.gif',
    '../images/einsteinclapping.gif',
    '../images/sputnik.gif'
];

const sadImages =[
    
    '../images/rocketexplosion.gif',
    '../images/planetexploding.gif',
    '../images/rickcrying.gif',
    '../images/satelliteexplosion.gif'
];

//Initial Values 
var counter = 5;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;

//If the Time is over go to the next question.
function nextQuestion() {

    const isQuestionOver=(quizQuestions.length -1)===currentQuestion;
    if (isQuestionOver) {
        console.log('Game is Over');
        displayResult();
    } else {

        currentQuestion++;
        loadQuestion();
    }

}
// Start a time of 30 seconds for the player to choose an answer from each question. 
function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
    // nextQuestion();
}

function CountDown() {
    counter--;

    $('#time').html('Timer:' + counter);

    if (counter === 0) {
        timeUp();
    }
}
// Displaying the questions and choices in the browser screen.

function loadQuestion() {
    counter = 5;
    timer = setInterval(CountDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#time').html("Timer:" + counter);
    $("#game").html(`<h4> ${question} </h4>${loadChoices(choices)}`);

}

function loadChoices(choices) {
    var result = "";

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// If a right or wrong choice is selected go to the next question.
$(document).on('click', ".choice", function(){
        clearInterval(timer);
        const selectedAnswer = $(this).attr('data-answer');
        const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
        if (correctAnswer===selectedAnswer){
            //User Wins
            score++;
            setTimeout(nextQuestion, 3 * 1000);
            console.log("Wins");
            preloadImage('win');
        } else{
            lost++;
            setTimeout(nextQuestion, 3 * 1000);
            preloadImage('lost');
            console.log("lost!");
        }
        
});

function displayResult() {
    const result=`
    <p>You get ${score} questions(s) right </p>
    <p>You got it wrong ${lost} questions(s) </p>
    <p>Total questions ${quizQuestions.length} questions(s) </p>
    <button class="btn btn-primary" id="reset" >Reset Game </button>
    `;
    $("#game").html(result);
}

$(document).on('click', '#reset', function(){
counter = 5;
currentQuestion = 0;
score = 0;
lost = 0;
timer=null;

   loadQuestion();
});

function loadRemainingQuestion(){
    const remainingQuestion = quizQuestions.length-(currentQuestion + 1)
    const TotalQuestion = quizQuestions.length;
    
    return `Remaining Question:${requestAnimationFrame}/${totalQuestion}`;
}
// Show funny gif pictures if correct or incorrect answers. 
function preloadImage(status){
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status==='win'){
        $('#game').html(`
            <p class='preload-image'> You Picked a Winner that's out of this World!</p>
            <p class='preload-image'> The correct answer is ${correctAnswer} </p>
        `);
    } else{
        $('#game').html(`
        <p class='preload-image'> Noooo! I'm sorry the correct answer was ${correctAnswer}</p>
        <p class='preload-image'> You really crashed and burned!!  </p>
    `);
    }

}

// loadimage ('');
loadQuestion();