"use strict";

let newGame = document.querySelector(".new-game-btn")
let rollBtn = document.querySelector(".roll")
let holdBtn = document.querySelector(".hold")
let score1 = document.querySelector(".p1")
let score2 = document.querySelector(".p2")
let currScore1 = document.querySelector(".c1")
let currScore2 = document.querySelector(".c2")
let dice = document.querySelector(".dice")
let turnPlayer1 = true;
let player1 = document.querySelector(".player1")
let player2 = document.querySelector(".player2")
let winner = document.querySelector(".winner")
let winnerContainer = document.querySelector(".winner-container")

let turns1 = [];
let turns2 = [];

//functions
function rollDice(){
    let num = Math.floor(Math.random() * 6) + 1;

        dice.setAttribute("data-value" , num);

        if(turnPlayer1){
            if( num == 1){
           currScore1.textContent = Number("0");
           turns1.push(Number(currScore1.textContent))
           turnPlayer1 = false;
           updateUI(2);
            }
            else{
                let curr = Number(currScore1.textContent)
                currScore1.textContent = curr + num ;
                updateUI(1);
            }   
        } else{
           if( num == 1){
           currScore2.textContent = Number("0");
           turns2.push(Number(currScore2.textContent))
           turnPlayer1 = true;
           updateUI(1);

            }
            else{
                let curr = Number(currScore2.textContent)
                currScore2.textContent = curr + num ;
                updateUI(2);
            }
        }  
        return num;
    }

function holdDice(){
    if(turnPlayer1){
        turns1.push(Number(currScore1.textContent));
        updateTotalScore(turns1);
        currScore1.textContent = Number("0");
        turnPlayer1 = false;
        updateUI(2);

    }
    else{
        turns2.push(Number(currScore2.textContent));
        updateTotalScore(turns2);
        currScore2.textContent = Number("0");
        turnPlayer1 = true;
        updateUI(1);

    }

}

function updateUI(currPlayer){
    if(currPlayer == 1){
           player1.classList.add("style")
           player2.classList.remove("style")
           checkWinner();
    }
    else{
           player2.classList.add("style")
           player1.classList.remove("style")
           checkWinner();
    } 
}

function updateTotalScore(turns){
    if(!turns){
        return alert("Invalid scores")
    }

    let totalScore = turns.reduce((acc , val) => acc + val , 0)
    
    if(totalScore <= 100 ){
       if(turns == turns1){
        score1.textContent = totalScore;
    }
    else{
        score2.textContent = totalScore;
    }
    }
    else{
        turns.pop();
        updateTotalScore(turns);
    }
   
   return totalScore;
}

function checkWinner(){
    if(Number(score1.textContent) === 100){
        winner.textContent = `Winner is Player 1`;
        winnerContainer.style.visibility = "visible"
    }
    if(Number(score2.textContent) === 100){
        winner.textContent = `Winner is Player 2`; 
        winnerContainer.style.visibility = "visible"
    }

    if(Number(score2.textContent) === 99 && Number(score1.textContent) === 99){
        winner.textContent = `Game Tied`; 
        winnerContainer.style.visibility = "visible"
    }
}

function resetGame(){
    turns1 = [];
    turns2 = [];
    turnPlayer1 = true;
    score1.textContent = "0";
    score2.textContent = "0";
    currScore1.textContent = "0";
    currScore2.textContent = "0";
    player1.classList.add("style");
    player2.classList.remove("style");
    winnerContainer.style.visibility = "hidden";
    dice.setAttribute('data-value', '0');
}

//event listners
rollBtn.addEventListener("click" , rollDice)
holdBtn.addEventListener("click" , holdDice);
newGame.addEventListener("click" , resetGame);

