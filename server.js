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
var lettersArray = randomWord.split("").map(function (letter) {
    return "_"
});
var lettersGuessed = []
var lives = 6;

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
    res.render('starter')
})

app.get('/game', function (req, res) {
    if (lives == 0) {
        return res.redirect('/lose')
    }
    if (randomWord == lettersArray.join("")) {
        return res.redirect('/win')
    }
    res.render('index', {
        words: lettersArray,
        counter: lives,
        letters: lettersGuessed,
        wrongGuess: req.session.error
    });
});

app.get('/lose', function (req, res) {
    gameRestart()
    res.render('lose')
})

app.get('/win', function (req, res) {
    gameRestart()
    res.render('win')
})

app.post('/game', function (req, res) {
    var userGuess = req.body.userGuess;
    let isWrong = true;

    if (checkIfUserGuessIsValid(userGuess, req, res)) {
        return res.redirect('/game');
    }
    //check if user input is in random word
    //put user input into random word OR guessed letters
    for (var i = 0; i < wordLength; i++) {
        if (userGuess == randomWord.split('')[i]) {
            lettersArray[i] = userGuess;
            isWrong = false
        }
    }
    if (isWrong) {
        console.log(userGuess);
        console.log(lettersGuessed);
        console.log(lettersGuessed.indexOf(userGuess));
        if (lettersGuessed.toString().indexOf(userGuess) < 0) {
            lettersGuessed.push(userGuess + " ")
            lives--;
        }
    }
    //display lettersArray and guessed letters
    return res.redirect('/game')
});
//logic
function checkIfUserGuessIsValid(userGuess, req, res) {
    if (isNaN(userGuess)) {
        req.session.error = "";
        return false;
    } else {
        req.session.error = "Please only use letters"
        return true;
    }
}
function gameRestart(params) {
    randomNumber = Math.floor(Math.random() * 100000);
    randomWord = words[randomNumber];
    wordLength = randomWord.length;
    lettersArray = []
    lettersGuessed = []
    lives = 6;
    for (i = 0; i < wordLength; i += 1) {
        lettersArray.push("_ ");
    }
}
