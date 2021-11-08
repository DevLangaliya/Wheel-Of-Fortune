let turn = Math.floor(Math.random() * 3 + 1);
let p1score = 0;
let p2score = 0;
let p3score = 0;
let money = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let bank = ["banana", "controller", "illustration", "calculus", "textbook", "interstellar", "orangutan", "pillow", "discombobulated", "magnificent", "charger", "insurance", "apostrophe"];
let emptySol = [];
let allowSpin = true;
let Player1 = "";
let Player2 = "";
let Player3 = "";
let multiplier = 0;
let SpecificTurn;
let SpecificScore;

function TakeName() {
    document.getElementById("SubmitName").style.display = "block";
    document.getElementById("GimmeName").style.display = "none";
    document.getElementById("Name").innerHTML = "Who will be playing today?";
    document.getElementById("Player1").style.display = "block";
    document.getElementById("Player2").style.display = "block";
    document.getElementById("Player3").style.display = "block";

}

function SubmitName(){
    Player1 = document.getElementById("Player1").value;
    Player2 = document.getElementById("Player2").value;
    Player3 = document.getElementById("Player3").value;
    document.getElementById("Name").innerHTML = "Our 3 contestants today are " + Player1 + ", " + Player2 + ", and " + Player3;
    document.getElementById("SubmitName").style.display = "none";
    document.getElementById("Player1").style.display = "none";
    document.getElementById("Player2").style.display = "none";
    document.getElementById("Player3").style.display = "none";
    document.getElementById("guess").style.display = "block";
    document.getElementById("score1").style.display = "inline";
    document.getElementById("score2").style.display = "inline";
    document.getElementById("score3").style.display = "inline";
    document.getElementById("score1").innerHTML = Player1 + " has $" + p1score;
    document.getElementById("score2").innerHTML = Player2 + " has $" + p2score;
    document.getElementById("score3").innerHTML = Player3 + " has $" + p3score;

}

function guess() {
    let word = bank[(Math.floor(Math.random() * bank.length))];
    let letterValue = money[Math.floor(Math.random() * money.length)];
    console.log(bank);
    console.log(word)
    multiplier = 0;
    PlayerTurns();
    alert("Spinning...");
    alert(SpecificTurn + " spun $" + letterValue + "!");
    if (allowSpin === false){
        document.getElementById("wheel").disabled = true;

    }
    for (let e = 0; e < word.length; e++) {
        emptySol[e] = " ___ ";

    }
    while (emptySol.includes(" ___ ")) {
        let guessed = prompt(emptySol + "     what letter do you choose")
        for (w = 0; w < word.length; w++) {
            if (word[w] === guessed) {
                emptySol[w] = guessed;
                multiplier++

            }
        }
    }

    //remove the used word form the "bank" array so it doesnt show up again

    alert (SpecificTurn + " got the word " + word + " correct!")
    SpecificScore = (multiplier * letterValue) + SpecificScore;
    alert (SpecificTurn + " earned $" + SpecificScore + "!")
    showMoney();
    turn = turn + 1;

}

function PlayerTurns(){
    if (turn % 3 === 0){
        SpecificTurn = Player1;
        SpecificScore = p1score;
        alert("It is " + Player1 + "'s turn");

    }else if (turn % 3 === 1){
        SpecificTurn = Player2;
        SpecificScore = p2score;
        alert("It is " + Player2 + "'s turn");

    }else if (turn % 3 === 2){
        SpecificTurn = Player3;
        SpecificScore = p3score;
        alert("It is " + Player3 + "'s turn");

    }
}

function showMoney() {
    if (turn % 3 === 0) {
        document.getElementById("score1").innerHTML = Player1 + " has $" + SpecificScore;

    } else if (turn % 3 === 1) {
        document.getElementById("score2").innerHTML = Player2 + " has $" + SpecificScore;

    } else if (turn % 3 === 2) {
        document.getElementById("score3").innerHTML = Player3 + " has $" + SpecificScore;

    }

}
/*function wheelSpin() {


    //alert("Each correct letter guessed will grant you " + letterValue + " dollars! Good Luck!");
    document.getElementById("spinValue").innerHTML = "You have spun $" + letterValue;



/*function giveWord(){
    allowSpin = false;
    if (allowSpin === false){
        document.getElementById("wheel").disabled = true;

    }
    for (let e = 0; e < word.length; e++) {
        emptySol[e] = " ___ ";
        document.getElementById("blankWord").innerHTML = "Word: " + emptySol;

    }
    for (let i=0; i < word.length; i++){
        let tempLetter = word.substring(i);
        tempLetter.push(tempWord);
        console.log(tempLetter)
        console.log(tempWord)

    }*/
/*function guess() {
    let guessed = document.getElementById("userGuess").value;
    let multiplier = 0;
    emptySol;

    console.log(guessed)
    console.log(word)
    while (emptySol.includes(" ___ ")) {

        for (let w = 0; w < word.length; w++) {

            if (word[w] === guessed) {

                emptySol[w] = guessed;
                multiplier++
                allowSpin = true;
            }


        }


    }
    alert("You got the word " + word + " correct")
    document.getElementById("score1").innerHTML = "Player 1 has $" + p1score;
    turn = turn + 1;*/
