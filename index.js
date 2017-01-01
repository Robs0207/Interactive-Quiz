// single state object declaration
var state = {
    currentQuestion: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questions: [{ 'question': 'In which year was the first World Cup played?', 'multipleChoice': [1926, 1966, 1930, 2002], 'answer': 'C' },
        { 'question': 'Which country won the World Cup the most times?', 'multipleChoice': ['Brazil', 'The Netherlands', 'Italy', 'Germany'], 'answer': 'A' },
        { 'question': 'Which player scored the goal of the century?', 'multipleChoice': ['Dennis Bergkamp (NL)', 'Zinedine Zidane (FR)', 'Ronaldo (BR)', 'Diego Maradona (ARG)'], 'answer': 'D' },
        { 'question': 'Most finishes in the top two without ever being champion?', 'multipleChoice': ['Italy', 'The Netherlands', 'Belgium', 'Iceland'], 'answer': 'B' },
        { 'question': 'Youngest player to ever play a World Cup game?', 'multipleChoice': ['Pelé (BR)', 'Theo Walcott (ENG)', 'Faryd Mondragón (COL)', 'Norman Whiteside (NIR)'], 'answer': 'D' },
        { 'question': 'Most finishes in the top three without ever being champion?', 'multipleChoice': ['Belgium', 'France', 'The Netherlands', 'Italy'], 'answer': 'C' },
        { 'question': 'What is the name of the goalkeeper who escaped a red card after a brutal attack on French defender Patrick Battiston in the 1982 WC?', 'multipleChoice': ['Dino Zoff (ITA)', 'Peter Shilton (ENG)', 'Harald Schumacher (GER)', 'Waldir Peres (BR)'], 'answer': 'C' },
        { 'question': 'Which team were referred to as "The Clockwork Orange"?', 'multipleChoice': ['The Netherlands', 'Ivory Coast', 'England', 'Senegal'], 'answer': 'A' },
        { 'question': 'Which player participated in the most World Cups?', 'multipleChoice': ['Lothar Matthäus (GER)', 'Pelé (BR)', 'Landon Donovan (US)', 'Diego Maradona (ARG)'], 'answer': 'B' },
        { 'question': 'What is the name of the first World Cup trophy?', 'multipleChoice': ['Jules Rimet Trophy', 'Heisman Trophy', 'FIFA World Cup Trophy', 'FA Cup Trophy'], 'answer': 'A' }
    ]
};

var questionElement = (
    '<li>' +
    '<span class="current-question js-current-question"></span>' +
    '<li>' +
    '<input class="js-mc" type="radio" id="js-mc-one" name="js-mc" value="A">' +
    '<label for="js-mc-one" class="js-mc-one"></label>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<input class="js-mc" type="radio" id="js-mc-two" name="js-mc" value="B">' +
    '<label for="js-mc-two" class="js-mc-two"></label>' +
    '</li>' +
    '<li>' +
    '<input class="js-mc" type="radio" id="js-mc-three" name="js-mc" value="C">' +
    '<label for="js-mc-three" class="js-mc-three"></label>' +
    '</li>' +
    '<li>' +
    '<input class="js-mc" type="radio" id="js-mc-four" name="js-mc" value="D">' +
    '<label for="js-mc-four" class="js-mc-four"></label>' +
    '</li>' +
    '<div class="current-question-controls">' +
    '<button class="current-question-next js-current-question-next">' +
    '<span class="button-label">Next Question</span>' +
    '</button>' +
    '</div>' +
    '</li>' +
    '<span><h6>Progress of percentage of questions answered</h6></span>' +
    '<div class = "progress-bar" id="totalProgressBar">' +
    '<div class = "progress-bar" id="totalQuestionsProgress">' +
    '<div class = "progress-bar" id="questionLabel">0%</div>' +
    '</div>' +
    '</div>' +
    '<span><h6>Progress of percentage of questions answered correctly</h6></span>' +
    '<div class = "progress-bar" id="totalCorrectProgressBar">' +
    '<div class = "progress-bar" id="totalCorrectProgress">' +
    '<div class = "progress-bar" id="correctLabel">0%</div>' +
    '</div>' +
    '</div>' +
    '<span><h6>Progress of percentage of questions answered incorrectly</h6></span>' +
    '<div class = "progress-bar" id="totalIncorrectProgressBar">' +
    '<div class = "progress-bar" id="totalIncorrectProgress">' +
    '<div class = "progress-bar" id="incorrectLabel">0%</div>' +
    '</div>' +
    '</div>'
);

$(function() {

    var formElement = $('#js-start-quiz-form');
    var questionElement = $('.js-question');

    handleStartNewQuiz(formElement, questionElement, state);
    handleNextQuestion(questionElement, state);
});

// event listeners
function handleStartNewQuiz(formElement, questionElement) {

    formElement.click(function(event) {

        var startQuizButton = document.getElementById("js-start-quiz");

// initialize values
        state.currentQuestion = 0;
        state.questionsAnswered = 0;
        state.questionsCorrect = 0;
        state.questionsIncorrect = 0;
 
        if (startQuizButton.defaultValue === "Chicken Out") {
            startQuizButton.defaultValue = "Bring it on!";

            $("li").remove();
            $("h6").remove();
            $("div").remove(".progress-bar");
            $("div").remove(".current-question-controls");

        } else {

            startQuizButton.defaultValue = "Chicken Out";
            renderQuestion(state, $(questionElement), 0);
        }

    });
}

function handleNextQuestion(questionElement, state) {

    questionElement.on('click', '.js-mc', function() {

        state.questions[state.currentQuestion].selected = $('.js-mc:checked').val();

    });

    questionElement.on('click', '.js-current-question-next', function(event) {

        if (checkQuestionAnswered() === true) {

            if (halfwayPointReached() === true) {

                state.currentQuestion++;
                renderQuestion(state, $(questionElement), state.currentQuestion);

            } else {

                state.currentQuestion = 0;
                state.questionsAnswered = 0;
                state.questionsCorrect = 0;
                state.uestionsIncorrect = 0;
                renderQuestion(state, $(questionElement), 0);
            }
            setProgressPercentage(state);
            setProgressBars(state);
        }
    });
}

function checkQuestionAnswered() {

    if (state.questions[state.currentQuestion].selected === undefined) {

        alert("Question has not been answered. Please answer before continuing.");
        return false;

    } else {

        return true;
    }
};

function halfwayPointReached() {

    if (state.currentQuestion === 4) {

        var r = confirm("Halfway point reached... You are feeling okay?");

        if (r == true) {

            return true;

        } else {

            return false;
        }

    } else {

        return true;
    }
};

function setProgressPercentage(state) {

    var index = state.currentQuestion;
    index--; //must deduct one from current question since it was already incremented
    state.questionsAnswered = state.questionsAnswered + 10;

    if (state.questions[index].selected === (state.questions[index].answer)) {

        state.questionsCorrect = state.questionsCorrect + 10;

    } else {

        state.questionsIncorrect = state.questionsIncorrect + 10;

    }

};

function setProgressBars(state) {

    setProgress("totalQuestionsProgress", state.questionsAnswered, "Question");
    setProgress("totalCorrectProgress", state.questionsCorrect, "Correct");
    setProgress("totalIncorrectProgress", state.questionsIncorrect, "Incorrect");

};

function setProgress(element, width, bar) {

    var elem = document.getElementById(element);

    frame(width);

    function frame() {

        elem.style.width = width + '%';

        if (bar === 'Question') {

            document.getElementById("questionLabel").innerHTML = width * 1 + '%';

        } else if (bar === 'Correct') {

            document.getElementById("correctLabel").innerHTML = width * 1 + '%';

        } else {

            document.getElementById("incorrectLabel").innerHTML = width * 1 + '%';
        }
    }
};

// render functions
var renderQuestion = function(state, element, index) {

    var questionHTML = $(questionElement); //element with question, multiple choice options and submit button

    if (index <= 9) {

        questionHTML.find('.js-current-question').text(state.questions[index].question);
        questionHTML.find('.js-mc-one').text(state.questions[index].multipleChoice[0]);
        questionHTML.find('.js-mc-two').text(state.questions[index].multipleChoice[1]);
        questionHTML.find('.js-mc-three').text(state.questions[index].multipleChoice[2]);
        questionHTML.find('.js-mc-four').text(state.questions[index].multipleChoice[3]);

        element.html(questionHTML); 

    } else {

        alert("You have done it, end of quiz reached... You are a rockstar! ");

        var startQuizButton = document.getElementById("js-start-quiz");
        startQuizButton.defaultValue = "Bring it on again!";
        $("li").remove();
        $("div").remove(".current-question-controls");
    }
};
