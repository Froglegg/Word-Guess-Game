var images = [];

function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "assets/images/hangman-reset.jpg",
    "assets/images/hangman-dead.jpg",
    "assets/images/hangman-1.jpg",
    "assets/images/hangman-2.jpg",
    "assets/images/hangman-3.jpg",
    "assets/images/hangman-4.jpg",
    "assets/images/hangman-5.jpg",
    "assets/images/hangman-6.jpg"
)
var wordList = [
    "zombie",
    "vampire",
    "dragon",
    "werewolf",
    "bigfoot",
    "aliens",
    "witches"
];

var hintList = [
    "unughhhhhhhhhh",
    "the original creatures of the night",
    "In some cultures, this creature has fur...",
    "Definitely NOT man's best friend...",
    "There's a whole society named after this creature in the Pacific Northwest",
    "I want to believe",
    "Known to hang out at Walpurgisnacht"
]

var lettersGuessedList = [];

var answerArray = [];

var randomWord;

var userDoingOk;

var space;

var hint;

var count;

var counter = document.getElementById("counter");

var hangMan = document.getElementById("hangMan");


function reset() {
    count = 7;
    hangMan.innerHTML = "<img src='assets/images/hangman-reset.jpg' class='hangManImage'>";
    counter.innerHTML = "<p>No of attempts: " + count + "</p>";
    document.getElementById("hint").innerHTML = " ";
    theAnswer = [];
    answerArray = [];
    lettersGuessedList = [];
    document.getElementById("lettersGuessed").innerHTML = "<p>Letters guessed: " + lettersGuessedList + "</p>";
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    getHint = wordList.indexOf(randomWord);
    // console.log(getHint);
    hint = hintList[getHint];
    // console.log(hint);
    for (var i = 0; i < randomWord.length; i++) {
        answerArray[i] = "_";
    };
    space = answerArray.join(" ");
    document.getElementById("currentWord").innerHTML = space;

    // console.log("answerArray[i]: " + answerArray );
}

function containsAny(source, target) {
    var result = source.filter(function(item) {
        return target.indexOf(item) > -1
    });
    return (result.length > 0);
}

document.onkeyup = function(keyPress) {
    document.getElementById("status").innerHTML = "<p> </p>";
    var userGuess = keyPress.key.toLowerCase();
    var everyLetterGuessed = lettersGuessedList.push(" " + userGuess);
    document.getElementById("lettersGuessed").innerHTML = "<p>Letters guessed: " + lettersGuessedList + "</p>";
    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord[i] == userGuess) {
            answerArray[i] = userGuess;
        }
    }
    if (containsAny(answerArray, userGuess) == true) {
        userDoingOk == true;
    } else {
        userDoingOk == false;
        count--;
    }

    var theAnswer = answerArray.join("");
    document.getElementById("counter").innerHTML = "<p>No of guesses remaining: " + count + "</p>";
    document.getElementById("currentWord").innerHTML = answerArray.join(" ");

    if (count == 6) {
        hangMan.innerHTML = "<img src='assets/images/hangman-1.jpg' class='hangManImage'>";
    }
    if (count == 5) {
        hangMan.innerHTML = "<img src='assets/images/hangman-2.jpg' class='hangManImage'>";

    }
    if (count == 4) {
        hangMan.innerHTML = "<img src='assets/images/hangman-3.jpg' class='hangManImage'>";


    }
    if (count == 3) {
        hangMan.innerHTML = "<img src='assets/images/hangman-4.jpg' class='hangManImage'>";


    }
    if (count == 2) {
        hangMan.innerHTML = "<img src='assets/images/hangman-5.jpg'class='hangManImage'>";


    }
    if (count == 1) {
        hangMan.innerHTML = "<img src='assets/images/hangman-6.jpg' class='hangManImage'>";

    }


    if (count < 4) {
        document.getElementById("hint").innerHTML = "<p>Hint: " + hint + " </p>";
    }

    if (count <= 0) {
        document.getElementById("status").innerHTML = "<p> you die!!!</p>";
        hangMan.innerHTML = "<img src='assets/images/hangman-dead.jpg' class='hangManImage'>";
        losses++;
        reset();

    } else if (containsAny(wordList, theAnswer) == true) {
        document.getElementById("status").innerHTML = "<p> you win!!!</p>";
        wins++;
        reset();
    }

}