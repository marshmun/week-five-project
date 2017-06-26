const express = require("express")
const mustacheExpress = require("mustache-express");
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();
const port = process.env.PORT || 4000;

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
var attempts = []



app.engine("mustache", mustacheExpress());
app.set('views', './profile');
app.set("view engine", "mustache")

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

var randomNumber = Math.floor(Math.random() * 100000);
var randomWord = words[randomNumber];
var wordLength = randomWord.length;
var replacedWords = []

for (i = 0; i < wordLength; i += 1) {
    replacedWords.push("_ ");
}


app.get('/', function (req, res) {
    var lettersMatched = ''
    var lettersGuessed = lettersMatched;
    var numLettersMatched = 0;
    setup();
    res.render('index', { words: replacedWords, counter: lives });
});


app.use(express.static('./profile'))

app.post('/', function (req, res) {

    res.redirect('/')
});

app.listen(port, function () {
    console.log("Server is running on port", port)
});
