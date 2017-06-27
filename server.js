const express = require("express")
const mustacheExpress = require("mustache-express");
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();
const port = process.env.PORT || 4000;

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


var randomNumber = Math.floor(Math.random() * 100000);
var randomWord = words[randomNumber];
var wordLength = randomWord.length;
var replacedWords = []
var lettersGuessed = []

for (i = 0; i < wordLength; i += 1) {
    replacedWords.push("_ ");
}


//template engine
app.engine("mustache", mustacheExpress());
app.set('views', './profile');
app.set("view engine", "mustache")


app.use(express.static('./profile'))
//middleware
app.use(bodyParser.urlencoded({ extended: false }))


//routes
app.listen(port, function () {
    console.log("Server is running on port", port)
});


app.get('/', function (req, res) {
    var lettersMatched = ''
    var lettersGuessed = lettersMatched;
    var numLettersMatched = 0;

    setup();
    res.render('index', { words: replacedWords, counter: lives, letters: lettersGuessed });
});



app.post('/', function (req, res) {
    var userGuess = req.body;
    // see if post is getting the user input
    console.log(userGuess);
    //check that user input is valid... one letter, no number

    //check if user input is in random word

    //put user input into random word OR guessed letters

    //display replacedwords and guessed letters


    // if (randomWord.indexOf(req) != -1) { // if the character is found
    //     for (var i = 0; i < wordLength; i++) { // loop on all characters
    //         if (randomWord[i] == req) // if this is an occurance
    //             progressWord[i] = chosenWord[i];
    //     }
    // } else {
    //     // wrong choice
    // }



    res.redirect('/')
});




//logic

function setup() {
    /* start config options */
    availableLetters = "abcdefghijklmnopqrstuvwxyz";
    lives = 8;
    messages = {
        win: 'You win!',
        lose: 'Game over!',
        guessed: ' already guessed, please try again...',
        validLetter: 'Please enter a letter from A-Z'
    };
};
