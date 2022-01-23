let turn;
let usedBank;
let scores;
let sports = [];
let currencies = [];
let softDrinks = [];
let carBrands = [];
let techComp = [];
let clothBrand = [];
let cheese = [];
let markets = [];
let rounds;
let Player1;
let Player2;
let Player3;
let multiplier;
let emptySol;
let PlayerNames;
let word;
let wordArray;
let spot;
let counter;
let letterValue;
let allowWord;
let allowSpin;
let allowGuess;
let allowSolve;
let allowBonus;
let SelectedItem;
let previousGuess = [];
let wordsolved;
let allBanks;
let displayWord;
let winner;
let life;
let tempBank;
let specificSpot;
let allowVowel;
let repeatedLetter;
let matchedLetter;
sports = ["football", "soccer", "badminton", "croquet", "volleyball", "cricket", "raquetball", "rugby", "handball", "tennis", "boxing", "hockey", "karate"];
currencies = ["dollar", "pound", "rupee", "yen", "peso", "euro", "franc", "krone", "dinar", "rand"];
carBrands = ["tesla", "lamborghini", "toyota", "ferrari", "chrysler", "pagani", "ford", "rolls-royce", "bugatti", "genesis", "alfa-romeo"];
softDrinks = ["dr.pepper", "coca-cola", "pepsi", "sunkist", "seven-up", "bubly", "sprite", "gatorade", "thumbs-up"];
techComp = ["intel", "hewlett-packard", "dell", "apple", "microsoft", "lenovo", "nvidia", "oculus", "anker", "google"];
clothBrand = ["gucci", "gap", "hilfiger", "chanel", "prada", "nike", "adidas", "puma", "armani", "fossil", "coach", "supreme"];
cheese = ["gouda", "ricotta", "cheddar", "mozzarella", "parmesean", "gruyere", "colby-jack", "feta", "gorgonzola", "havarti", "muenster", "provolone", "swiss"];
markets = ["target", "walmart", "kroger", "costco", "aldi's", "seven-eleven", "meijer", "safeway", "walgreens", "jewel-osco"]

let music = new Audio('themeSong.mp3');
music.pause();

//plays music
function playMusic(){
    music.play();
    document.getElementById("play").disabled = true;
    document.getElementById("pause").disabled = false;
}

//pauses music
function pauseMusic(){
    music.pause();
    document.getElementById("pause").disabled = true;
    document.getElementById("play").disabled = false;
}

//i do not understand this function but i keep it like this becuase otherwise my wheel won't work
function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

//shows textboxes forthe players to input their names
function TakeName() {
    document.getElementById("SubmitName").style.display = "block";
    document.getElementById("GimmeName").style.display = "none";
    document.getElementById("Name").innerHTML = "Who will be playing today?";
    document.getElementById("Player1").style.display = "block";
    document.getElementById("Player2").style.display = "block";
    document.getElementById("Player3").style.display = "block";
}

//resets all values and sends the player names to their array, and creates a score array
//displays all immportant elments of the main UI as well
function SubmitName(){
    life = 10;
    rounds = 0;
    scores = [10, 10, 10];
    emptySol = [];
    PlayerNames = [];
    wordArray = [];
    allBanks = [sports, currencies, softDrinks, carBrands, techComp, markets, clothBrand, cheese];
    counter = 0;
    allowWord = true;
    allowSpin = true;
    allowVowel = false;
    allowGuess = false;
    allowSolve = false;
    repeatedLetter = false;
    allowBonus = false;
    matchedLetter = false;
    turn = Math.floor(Math.random()*3 + 3);
    PlayerNames.push(document.getElementById("Player1").value);
    PlayerNames.push(document.getElementById("Player2").value);
    PlayerNames.push(document.getElementById("Player3").value);
    document.getElementById("yo").innerHTML = "";
    document.getElementById("mainbox").style.display = "block";
    document.getElementById("Name").innerHTML = "Our 3 contestants today are " + PlayerNames[0] + ", " + PlayerNames[1] + ", and " + PlayerNames[2];
    document.getElementById("SubmitName").style.display = "none";
    document.getElementById("newWord").style.display = "block";
    document.getElementById("newWord").disabled = true;
    document.getElementById("Player1").style.display = "none";
    document.getElementById("Player2").style.display = "none";
    document.getElementById("Player3").style.display = "none";
    document.getElementById("guess").style.display = "block";
    document.getElementById("guess").disabled = true;
    document.getElementById("guess2").style.display = "block";
    document.getElementById("guess2").disabled = true;
    document.getElementById("score1").style.display = "block";
    document.getElementById("score2").style.display = "block";
    document.getElementById("score3").style.display = "block";
    document.getElementById("switchName").style.display = "block";
    document.getElementById("restartGame").style.display = "block";
    document.getElementById("lastOne").style.display = "none";
    document.getElementById("score1").innerHTML = PlayerNames[0] + " has $" + scores[0];
    document.getElementById("score2").innerHTML = PlayerNames[1] + " has $" + scores[1];
    document.getElementById("score3").innerHTML = PlayerNames[2] + " has $" + scores[2];
    usedBank = allBanks[Math.floor(Math.random()*allBanks.length)];
    showBank();
    document.getElementById("fullSend").style.display = "block";
    document.getElementById("fullSend").disabled = true;
    PlayerTurns();
}

//shows what category the players get their words from
function showBank(){
    if (usedBank == sports){
        document.getElementById("categories").innerHTML = "The chosen category is SPORTS";
    } else if (usedBank == currencies){
        document.getElementById("categories").innerHTML = "The chosen category is CURRENCIES";
    } else if (usedBank == softDrinks){
        document.getElementById("categories").innerHTML = "The chosen category is SOFT DRINKS";
    } else if (usedBank == carBrands){
        document.getElementById("categories").innerHTML = "The chosen category is CAR BRANDS";
    } else if (usedBank == techComp){
        document.getElementById("categories").innerHTML = "The chosen category is TECH COMPANIES";
    } else if (usedBank == clothBrand){
        document.getElementById("categories").innerHTML = "The chosen category is CLOTHING BRANDS";
    } else if (usedBank == cheese){
        document.getElementById("categories").innerHTML = "The chosen category is types of CHEESES";
    } else if (usedBank == markets){
        document.getElementById("categories").innerHTML = "The chosen category is CONVENIENCE STORES & SUPERMARKETS";
    }
}

//this is how the wheel works, and sets values based on what it lands on
function spin() {
    if (allowSpin === true) {
        const box = document.getElementById("box");
        const element = document.getElementById("mainbox");
        let $100 = shuffle([1890, 2250, 2610]);
        let $200 = shuffle([1850, 2210, 2570]);
        let $300 = shuffle([1810, 2170, 2530]);
        let $400 = shuffle([1770, 2130, 2490]);
        let $500 = shuffle([1750, 2110, 2470]);
        let $600 = shuffle([1630, 1990, 2350]);
        let $700 = shuffle([1570, 1930, 2290]);
        let Hasil = shuffle([$100[0], $200[0], $300[0], $400[0], $500[0], $600[0], $700[0]]);
        if ($100.includes(Hasil[0])) SelectedItem = 100;
        if ($200.includes(Hasil[0])) SelectedItem = 200;
        if ($300.includes(Hasil[0])) SelectedItem = 300;
        if ($400.includes(Hasil[0])) SelectedItem = 400;
        if ($500.includes(Hasil[0])) SelectedItem = 500;
        if ($600.includes(Hasil[0])) SelectedItem = "bankrupt";
        if ($700.includes(Hasil[0])) SelectedItem = "lose turn";
        box.style.setProperty("transition", "all ease 5s");
        box.style.transform = "rotate(" + Hasil[0] + "deg)";
        element.classList.remove("animate");
        setTimeout(function () {
            element.classList.add("animate");
        });
        setTimeout(function () {
            box.style.setProperty("transition", "initial");
            box.style.transform = "rotate(90deg)";
            document.getElementById("monies").innerHTML = "";
            if (SelectedItem == 100 || SelectedItem == 200 || SelectedItem == 300 ||SelectedItem == 400 ||SelectedItem == 500) {
                letterValue = SelectedItem;
                document.getElementById("monies").innerHTML = PlayerNames[turn % 3] + " spun $" + letterValue;
                document.getElementById("guess").disabled = false;
                document.getElementById("guess2").disabled = true;
                document.getElementById("newWord").disabled = false;
            } else if (SelectedItem == "lose turn"){
                document.getElementById("monies").innerHTML = PlayerNames[turn % 3] + " lost their turn!!";
                turn++;
                document.getElementById("guess").disabled = true;
                rounds++
                allowGuess = false;
                allowSpin = true;
                allowWord = true;
                PlayerTurns();
                endGame();
            } else if (SelectedItem == "bankrupt"){
                document.getElementById("monies").innerHTML = PlayerNames[turn % 3] + " went bankrupt!";
                scores[turn%3] = 0;
                showMoney();
                turn++;
                document.getElementById("guess").disabled = true;
                rounds++
                allowGuess = false;
                allowSpin = true;
                allowWord = true;
                PlayerTurns();
                endGame();
            }
            showMoney();
        }, 6000);
        allowSpin = false;
        console.log(usedBank);
    } else {
        alert ("Make sure you guess a letter first!")
    }
}

//shows the word to the players
function showWord() {
    if (allowWord == true) {
        document.getElementById("usedLetters").innerHTML = "";
        emptySol = [];
        showMoney();
        PlayerTurns();
        spot = Math.floor(Math.random()*usedBank.length)
        word = usedBank[spot];
        wordArray = word.split("");
        console.log(wordArray);
        for (let e = 0; e < wordArray.length; e++) {
            if (wordArray[e] == "-"){
                emptySol[e] = " - ";
            } else if (wordArray[e] == "."){
                emptySol[e] = " . ";
            } else if (wordArray[e] == "'"){
                emptySol[e] = " ' ";
            } else {
                emptySol[e] = " ___ ";
            }
        }
        displayWord = emptySol.join(" ");
        document.getElementById("word").innerHTML = displayWord;
        document.getElementById("fullSend").disabled = true;
        document.getElementById("guess").disabled = false;
        allowSolve = false;
        allowWord = false;
    } else {
        alert ("Finish the current word first!");
    }
}

//this is when the user wants to guess a consonant
function guessCon() {
    if (allowSpin === false && allowGuess === false) {
        allowGuess = true;
        PlayerTurns();
        if (allowGuess === true) {
            multiplier = 0;
            while (emptySol.includes(" ___ ") && allowGuess === true) {
                let guessed = prompt("What LOWERCASE consonant would you like to guess " + PlayerNames[turn % 3] + "?")
                if (previousGuess.includes(guessed)) {
                    alert("you have already guessed this letter dummy!")
                    turn++
                    rounds++
                    showMoney();
                    PlayerTurns();
                    endGame();
                    matchedLetter = true;
                    allowSpin = true;
                    break;
                }
                for (let w = 0; w < word.length; w++) {
                    if (word[w] == guessed) {
                        if (guessed === "b" || guessed === "c" || guessed === "d" || guessed === "f" || guessed === "g" || guessed === "h" || guessed === "j" || guessed === "k" || guessed === "l" || guessed === "m" || guessed === "n" || guessed === "p" || guessed === "q" || guessed === "r" || guessed === "s" || guessed === "t" || guessed === "v" || guessed === "w" || guessed === "x" || guessed === "y" || guessed === "z") {
                            emptySol[w] = guessed;
                            multiplier++;
                            allowGuess = false;
                            displayWord = emptySol.join(" ");
                            document.getElementById("word").innerHTML = displayWord;
                        } else {
                            alert("May I suggest buying a vowel instead?");
                            break;
                        }
                        allowSpin = true;
                        allowSolve = true;
                    }
                }
                if (word.includes(guessed) != true) {
                    alert("Wrong!!!");
                    turn++;
                    document.getElementById("guess").disabled = true;
                    rounds++
                    allowGuess = false;
                    allowSpin = true;
                    allowWord = false;
                    document.getElementById("monies").innerHTML = "";
                    PlayerTurns();
                    endGame();
                } else if (word.includes(guessed) == true && matchedLetter == false) {
                    alert(PlayerNames[turn % 3] + " guessed correctly and earned $" + (multiplier * letterValue));
                    document.getElementById("fullSend").disabled = false;
                    document.getElementById("monies").innerHTML = "";
                }
                previousGuess.push(guessed);
                document.getElementById("usedLetters").innerHTML = "Used letters: " + previousGuess;
                scores[turn % 3] = scores[turn % 3] + (multiplier * letterValue);
                showMoney();
            }
        }
        removeWord();
    } else {
        alert("Make sure you have gotten a word and an amount!!!")
    }
}

//this is used to determine whose turn it is when an incorrect answers is provided or at the begnning of the game when the turn value is randomized inside the names array
function PlayerTurns(){
    if (turn % 3 === 0){
        document.getElementById("turns").innerHTML = "It is " + PlayerNames[0] + "'s turn"
    } else if (turn % 3 === 1){
        document.getElementById("turns").innerHTML = "It is " + PlayerNames[1] + "'s turn"
    } else if (turn % 3 === 2) {
        document.getElementById("turns").innerHTML = "It is " + PlayerNames[2] + "'s turn"
    }
    console.log(rounds);
}

//displays money and checks to see if each player can afford to buy a vowel
function showMoney() {
    if (turn % 3 === 0) {
        if (scores[0] >= 250){
            document.getElementById("guess2").disabled = false;
        } else {
            document.getElementById("guess2").disabled = true;
        }
        document.getElementById("score1").innerHTML = PlayerNames[0] + " has $" + scores[0];
    } else if (turn % 3 === 1) {
        if (scores[1] >= 250){
            document.getElementById("guess2").disabled = false;
        } else {
            document.getElementById("guess2").disabled = true;
        }
        document.getElementById("score2").innerHTML = PlayerNames[1] + " has $" + scores[1];
    } else if (turn % 3 === 2) {
        if (scores[2] >= 250){
            document.getElementById("guess2").disabled = false;
        } else {
            document.getElementById("guess2").disabled = true;
        }
        document.getElementById("score3").innerHTML = PlayerNames[2] + " has $" + scores[2];
    }
}

//displays who won and the button to begin the finzal puzzle for the winner
function endGame(){
    if (rounds == 9) {
        if (scores[0] > scores[1] && scores[0] > scores[2]) {
            alert ("The game is over!");
            document.getElementById("yo").innerHTML = PlayerNames[0] + " has won!";
            winner = PlayerNames[0];
        } else if (scores[1] > scores[0] && scores[1] > scores[2]) {
            alert ("The game is over!");
            winner = PlayerNames[1];
            document.getElementById("yo").innerHTML = PlayerNames[1] + " has won!";
        } else if (scores[2] > scores[1] && scores[2] > scores[0]) {
            alert ("The game is over!");
            document.getElementById("yo").innerHTML = PlayerNames[2] + " has won!";
            winner = PlayerNames[2];
        }
        document.getElementById("SubmitName").style.display = "none";
        document.getElementById("Name").innerHTML = "";
        document.getElementById("Player1").style.display = "none";
        document.getElementById("Player2").style.display = "none";
        document.getElementById("Player3").style.display = "none";
        document.getElementById("mainbox").style.display = "none";
        document.getElementById("SubmitName").style.display = "none";
        document.getElementById("newWord").style.display = "none";
        document.getElementById("guess").style.display = "none";
        document.getElementById("guess2").style.display = "none";
        document.getElementById("score1").style.display = "none";
        document.getElementById("score2").style.display = "none";
        document.getElementById("score3").style.display = "none";
        document.getElementById("score1").innerHTML = "";
        document.getElementById("score2").innerHTML = "";
        document.getElementById("score3").innerHTML = "";
        document.getElementById("fullSend").style.display = "none";
        document.getElementById("turns").style.display = "none";
        document.getElementById("word").innerHTML = "";
        document.getElementById("monies").innerHTML = "";
        document.getElementById("usedLetters").innerHTML = "";
        document.getElementById("categories").innerHTML = "";
        document.getElementById("lastOne").style.display = "block";
    }
}

//removes a word from the selected array once it has been correctl guessed
function removeWord(){
    if (emptySol.includes(" ___ ") != true || wordsolved == true){
        usedBank.splice(spot, 1);
        alert ("The word " + word + " was correctly guessed!");
        document.getElementById("usedLetters").innerHTML = "";
        allowWord = true;
        allowSpin = true;
        allowGuess = false;
        previousGuess = [];
        allowSolve = false;
        wordsolved = false;
        turn++;
        document.getElementById("guess").disabled = true;
        rounds++;
        counter++;
        document.getElementById("fullSend").disabled = true;
        endGame();
        PlayerTurns();
    }
}

//allows players to try and solve the word
function guessWholeWord() {
    if (allowSolve === true) {
        let luckNeeded = prompt(PlayerNames[turn % 3] + ", what do you think the word is?");
        if (luckNeeded === word) {
            alert("CONGRATULATIONS " + PlayerNames[turn % 3] + "! You got the word " + word + " correct and earned the special prize of $" + (word.length * letterValue) + "!")
            scores[turn % 3] = scores[turn % 3] + (word.length * letterValue);
            showMoney();
            document.getElementById("word").innerHTML = word;
            allowGuess = false;
            allowWord = true;
            allowSpin = true;
            allowSolve = false;
            wordsolved = true;
            removeWord();
        } else {
            alert("Sorry, " + PlayerNames[turn % 3] + ", but that is not the correct word.");
            turn++
            document.getElementById("guess").disabled = true;
            rounds++
            PlayerTurns();
            allowGuess = false;
            allowWord = true;
            allowSpin = true;
            allowSolve = false;
            endGame();
        }
    }
}

//first check to see if the player can afford to buy vowel, and doesn't award money if guessed correctly
function guessVow() {
    let consent = prompt("You are about to buy a vowel for $250, would you like to proceed? Answer with either a 'y' or 'n'.")
    if (consent === "y") {
        if (scores[turn % 3] - 250 >= 0) {
            scores[turn % 3] = scores[turn % 3] - 250;
            showMoney();
            while (emptySol.includes(" ___ ")) {
                let guessed = prompt("What LOWERCASE vowel would you like to guess " + PlayerNames[turn % 3] + "?")
                if (previousGuess.includes(guessed)) {
                    alert("you have already guessed this letter dummy!")
                    turn++
                    rounds++
                    showMoney();
                    PlayerTurns();
                    matchedLetter = true;
                    break;
                }
                for (let w = 0; w < word.length; w++) {
                    if (word[w] == guessed) {
                        if (guessed === "a" || guessed === "e" || guessed === "i" || guessed === "o" || guessed === "u") {
                            emptySol[w] = guessed;
                            allowGuess = false;
                            displayWord = emptySol.join(" ");
                            document.getElementById("word").innerHTML = displayWord;
                        }
                    }
                    allowSpin = true;
                    allowSolve = true;
                }
                previousGuess.push(guessed);
                document.getElementById("usedLetters").innerHTML = "Used letters: " + previousGuess;
                if (word.includes(guessed) != true) {
                    alert("Wrong!!!");
                    turn++
                    rounds++
                    document.getElementById("guess").disabled = true;
                    PlayerTurns();
                    allowGuess = false;
                    allowSpin = true;
                    allowWord = false;
                    endGame();
                } else {
                    alert(PlayerNames[turn % 3] + " guessed correctly!");
                    document.getElementById("monies").innerHTML = "";
                }
                break;
            }
            showMoney();
            removeWord();
        } else {
            alert("It looks like you do not possess the sufficient funds to purchase a vowel. May I suggest getting better?");
            turn++;
            rounds++;
            PlayerTurns();
        }
    } else if (consent === "n") {
        alert("Make up your mind.");
    }
}

//displays the final puzzle
function finalPuzzle(){
    previousGuess = [];
    document.getElementById("usedLetters").innerHTML = "Used letters:" + previousGuess;
    document.getElementById("restartGame").style.display = "none";
    document.getElementById("fullSend2").style.display = "block";
    document.getElementById("lastOne").disabled = true;
    document.getElementById("fullSend2").disabled = true;
    document.getElementById("finalattempt").style.display = "block";
    emptySol = [];
    document.getElementById("Name").innerHTML = winner + ", it is time for the hardest puzzle you have ever faced. You also have only a limited amount of attempts to guess correctly. Take your time and proceed carefully";
    tempBank = ["exemplary", "flabbergasted", "unanimously"]
    specificSpot = Math.floor(Math.random()*tempBank.length)
    word = tempBank[specificSpot];
    if (specificSpot == 0){
        document.getElementById("lastHint").innerHTML = "Hint: This is a word that describes how a person did a task.";
        life = 10;
        document.getElementById("lifeCounter").innerHTML = "Attempts left: " + life;
    } else if (specificSpot == 1) {
        document.getElementById("lastHint").innerHTML = "Hint: This is what you feel when you are astounded, but to the next level.";
        life = 7;
        document.getElementById("lifeCounter").innerHTML = "Attempts left: " + life;
    } else if (specificSpot == 2) {
        document.getElementById("lastHint").innerHTML = "Hint: When everyone votes for the same thing";
        life = 5;
        document.getElementById("lifeCounter").innerHTML = "Attempts left: " + life;
    }
    wordArray = word.split("");
    console.log(wordArray);
    for (let e = 0; e < wordArray.length; e++) {
        emptySol[e] = " ___ ";
    }
    displayWord = emptySol.join(" ");
    document.getElementById("word").innerHTML = displayWord;
}

//lets the user take guesses at the final puzzle
function finalGuess(){
    let guessed = prompt ("What is your first guess?")
    for (let g = 0; g < word.length; g++) {
        if (word[g] == guessed) {
            if (guessed === "b" || guessed === "a" ||guessed === "e" ||guessed === "i" ||guessed === "o" ||guessed === "u" ||guessed === "c" || guessed === "d" || guessed === "f" || guessed === "g" || guessed === "h" || guessed === "j" || guessed === "k" || guessed === "l" || guessed === "m" || guessed === "n" || guessed === "p" || guessed === "q" || guessed === "r" || guessed === "s" || guessed === "t" || guessed === "v" || guessed === "w" || guessed === "x" || guessed === "y" || guessed === "z") {
                emptySol[g] = guessed;
                allowGuess = false;
                displayWord = emptySol.join(" ");
                document.getElementById("word").innerHTML = displayWord;
            }
        }
        document.getElementById("fullSend2").disabled = false;
    }
    previousGuess.push(guessed);
    document.getElementById("usedLetters").innerHTML = "Used letters: " + previousGuess;
    if (word.includes(guessed) != true) {
        life = life - 1;
        if (life == 0){
            alert("Unfortunately " + winner + " that was the last of your lives. Please play again if you wish, and have a good day.")
            document.getElementById("lastOne").style.visibility = "none";
            document.getElementById("categories").innerHTML = "";
            document.getElementById("GimmeName").style.visibility = "block";
            document.getElementById("Name").innerHTML = "";
            document.getElementById("word").style.visibility = "none"
            document.getElementById("lastOne").disabled = false;
            document.getElementById("lastOne").style.visibility = "none";
            document.getElementById("restartGame").style.visibility = "block";
        } else {
            alert("Wrong. You now remain with " + life + " attempts left. I believe in you.");
            document.getElementById("lifeCounter").innerHTML = "Attempts left: " + life;
        }
    } else {
        alert(winner + " guessed correctly!");
    }
    if (emptySol.includes(" ___ ") != true){
        alert ("Congratulations to " + winner + " for successfully beating the final challenge. You can play again if you choose to, or not, whatever you choose.")
        document.getElementById("lastOne").style.visibility = "none";
        document.getElementById("categories").innerHTML = "";
        document.getElementById("GimmeName").style.visibility = "block";
        document.getElementById("Name").innerHTML = "";
        document.getElementById("word").style.visibility = "none"
        document.getElementById("lastOne").disabled = false;
        document.getElementById("lastOne").style.visibility = "none";
        document.getElementById("restartGame").style.visibility = "block";
    }
}

//the solve function but for the final puzzle
function hailmary(){
    let hopeneeded = prompt(winner + ", what do you think the final solution is?")
    if (hopeneeded == word){
        alert ("Congratulations to " + winner + " for successfully beating the final challenge. You can play again if you choose to, or not, whatever you choose.")
        document.getElementById("lastOne").style.visibility = "none";
        document.getElementById("categories").innerHTML = "";
        document.getElementById("GimmeName").style.visibility = "block";
        document.getElementById("Name").innerHTML = "";
        document.getElementById("word").style.visibility = "none"
        document.getElementById("lastOne").disabled = false;
        document.getElementById("lastOne").style.visibility = "none";
        document.getElementById("word").innerHTML = word;
        document.getElementById("lastHint").style.display = "none";
        document.getElementById("finalattempt").style.display = "none";
        document.getElementById("fullSend2").style.display = "none";
        document.getElementById("restartGame").style.display = "block";
    } else {
        life = life - 1;
        if (life == 0){
            alert("Unfortunately " + winner + " that was the last of your lives. Please play again if you wish, and have a good day.")
            document.getElementById("lastOne").style.visibility = "none";
            document.getElementById("categories").innerHTML = "";
            document.getElementById("Name").innerHTML = "";
            document.getElementById("word").style.visibility = "none"
            document.getElementById("lastOne").disabled = false;
            document.getElementById("lastOne").style.visibility = "none";
            document.getElementById("restartGame").style.display = "block";
        } else {
            alert("Wrong. You now remain with " + life + " attempts left. I believe in you.");
            document.getElementById("lifeCounter").innerHTML = "Attempts left: " + life;
        }
    }
}

//lets you change names mid game
function changeNames(){
    document.getElementById("restartGame").style.display = "none";
    document.getElementById("switchName").style.display = "none";
    document.getElementById("confirmSwitch").style.display = "block";
    document.getElementById("SubmitName").style.display = "none";
    document.getElementById("Name").style.display = "none";
    document.getElementById("Player1").style.display = "block";
    document.getElementById("Player2").style.display = "block";
    document.getElementById("Player3").style.display = "block";
    document.getElementById("mainbox").style.display = "none";
    document.getElementById("SubmitName").style.display = "none";
    document.getElementById("newWord").style.display = "none";
    document.getElementById("guess").style.display = "none";
    document.getElementById("guess2").style.display = "none";
    document.getElementById("score1").style.display = "none";
    document.getElementById("score2").style.display = "none";
    document.getElementById("score3").style.display = "none";
    document.getElementById("fullSend").style.display = "none";
    document.getElementById("turns").style.display = "none";
    document.getElementById("word").style.display = "none";
    document.getElementById("monies").style.display = "none";
    document.getElementById("usedLetters").style.display = "none";
    document.getElementById("categories").style.display = "none";
}

//confirms the previous changes
function confirmChange(){
    PlayerNames = [];
    PlayerNames.push(document.getElementById("Player1").value);
    PlayerNames.push(document.getElementById("Player2").value);
    PlayerNames.push(document.getElementById("Player3").value);
    document.getElementById("restartGame").style.display = "block";
    document.getElementById("switchName").style.display = "block";
    document.getElementById("confirmSwitch").style.display = "none";
    document.getElementById("SubmitName").style.display = "none";
    document.getElementById("Name").style.display = "block";
    document.getElementById("Name").innerHTML = "Our 3 contestants today are " + PlayerNames[0] + ", " + PlayerNames[1] + ", and " + PlayerNames[2];
    document.getElementById("Player1").style.display = "none";
    document.getElementById("Player2").style.display = "none";
    document.getElementById("Player3").style.display = "none";
    document.getElementById("mainbox").style.display = "block";
    document.getElementById("SubmitName").style.display = "none";
    document.getElementById("newWord").style.display = "none";
    document.getElementById("guess").style.display = "block";
    document.getElementById("guess2").style.display = "block";
    document.getElementById("score1").style.display = "block";
    document.getElementById("score2").style.display = "block";
    document.getElementById("score3").style.display = "block";
    document.getElementById("fullSend").style.display = "block";
    document.getElementById("turns").style.display = "block";
    document.getElementById("word").style.display = "block";
    document.getElementById("newWord").style.display = "block";
    document.getElementById("monies").style.display = "block";
    document.getElementById("usedLetters").style.display = "block";
    document.getElementById("categories").style.display = "block";
    document.getElementById("score1").innerHTML = PlayerNames[0] + " has $" + scores[0];
    document.getElementById("score2").innerHTML = PlayerNames[1] + " has $" + scores[1];
    document.getElementById("score3").innerHTML = PlayerNames[2] + " has $" + scores[2];
    document.getElementById("monies").innerHTML = PlayerNames[turn % 3] + " spun $" + letterValue;
    showMoney();
    PlayerTurns();
}

//restarts the game
function restartGame(){
    document.getElementById("Name").innerHTML = "Who will be playing today?";
    document.getElementById("switchName").style.display = "none";
    document.getElementById("SubmitName").style.display = "block";
    document.getElementById("Name").innerHTML = "";
    document.getElementById("Player1").style.display = "block";
    document.getElementById("Player2").style.display = "block";
    document.getElementById("Player3").style.display = "block";
    document.getElementById("mainbox").style.display = "none";
    document.getElementById("newWord").style.display = "none";
    document.getElementById("guess").style.display = "none";
    document.getElementById("guess2").style.display = "none";
    document.getElementById("score1").innerHTML = "";
    document.getElementById("score2").innerHTML = "";
    document.getElementById("score3").innerHTML = "";
    document.getElementById("fullSend").style.display = "none";
    document.getElementById("turns").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("monies").innerHTML = "";
    document.getElementById("usedLetters").innerHTML = "";
    document.getElementById("categories").innerHTML = "";
    document.getElementById("restartGame").style.display = "none";
    document.getElementById("lifeCounter").innerHTML = "";
    document.getElementById("finalattempt").innerHTML = "";
    document.getElementById("lastOne").style.display = "none";
}
