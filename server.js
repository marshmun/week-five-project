const express = require("express")
const mustacheExpress = require("mustache-express");
const bodyParser = require('body-parser');
const session = require("express-session");
const fs = require('fs')
const app = express();
const port = process.env.PORT || 4000;

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


var randomNumber = Math.floor(Math.random() * 100000);
var randomWord = words[randomNumber];
var wordLength = randomWord.length;
var replacedWords = []
var lettersGuessed = []
var lives = 8;

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
app.use(
    session({
        secret: "aberrant horse gun",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 900000 }
    })
);

//routes
app.listen(port, function () {
    console.log("Server is running on port", port)
});


app.get('/', function (req, res) {


    res.render('index', { words: replacedWords, counter: lives, letters: lettersGuessed, wrongGuess: req.session.error });
});



app.post('/', function (req, res) {
    var userGuess = req.body.userGuess;
    let isWrong = true;

    checkIfUserGuessIsValid(userGuess, req, res);

    //check if user input is in random word
    //put user input into random word OR guessed letters
    for (var i = 0; i < wordLength; i++) {
        if (userGuess == randomWord.split('')[i]) {
            replacedWords[i] = userGuess;
            isWrong = false
        }
    }
    if (isWrong) {
        lettersGuessed.push(userGuess)
        lives = lives - 1;
        // lives -= 1;
    }



    //display replacedwords and guessed letters





    return res.redirect('/')
});




//logic


function checkIfUserGuessIsValid(userGuess, req, res) {
    if (isNaN(userGuess)) {
        req.session.error = "";

    } else {
        req.session.error = "Please only use letters"
        return res.redirect('/')
    }
}
