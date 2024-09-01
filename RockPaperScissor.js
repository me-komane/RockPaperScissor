const gameImages = document.querySelectorAll(".gameImage");
const info = document.getElementById("info");
const gameDisplay = document.getElementById("gameDisplay");

gameImages.forEach(image => {
    image.addEventListener("click", event =>{
        if (event.target.id === "pvp"){
            pvp();   
        }
        else{
            pve();
        }
    })
})

function pvp(){
    info.textContent = "Player 1's move:";
    let mode = "pvp";

    gameImages.forEach(image => {
        image.style.display = "none"
    })

    startGame(mode, "");
}

function pve(){
    info.textContent = "Choose your move:";
    let mode = "pve";

    gameImages.forEach(image => {
        image.style.display = "none"
    })

    startGame(mode, "")
}

function startGame(mode, move){
    let rock = document.createElement("img");
    rock.id = "rock";
    rock.src = "rock.png";
    rock.style.width = "200px";
    rock.style.borderRadius = "50%";
    rock.classList = "choiceImages";
    document.body.appendChild(rock);

    let paper = document.createElement("img");
    paper.id = "paper";
    paper.src = "paper.png";
    paper.style.width = "200px";
    paper.style.borderRadius = "50%";
    paper.classList = "choiceImages";
    document.body.appendChild(paper);

    let scissors = document.createElement("img");
    scissors.id = "scissors";
    scissors.src = "scissors.png";  
    scissors.style.width = "200px";
    scissors.style.borderRadius = "50%";  
    scissors.classList = "choiceImages";
    document.body.appendChild(scissors);

    let scoreBoard = document.createElement("div");
    scoreBoard.id = "scoreBoard";
    document.body.appendChild(scoreBoard);

    let player1Score = document.createElement("div");
    player1Score.id = "player1Score";
    player1Score.textContent = "0";
    scoreBoard.appendChild(player1Score);

    let dash = document.createElement("div");
    dash.id = "dash";
    dash.textContent = "-";
    scoreBoard.appendChild(dash);

    let player2Score = document.createElement("div");
    player2Score.id = "player2Score";
    player2Score.textContent = "0";
    scoreBoard.appendChild(player2Score);

    let home = document.createElement("button");
    home.id = "home";
    home.onclick = returnToHome;
    home.textContent = "Return To Home";
    document.body.appendChild(home);

    choiceImages = document.querySelectorAll(".choiceImages");
    
    if (mode === "pve"){
        choiceImages.forEach(image => {
            image.addEventListener("click", event => {
                if (event.target.id === "rock"){
                    checkForWin(mode, "rock", move);
                }
                else if (event.target.id === "paper"){
                    checkForWin(mode, "paper", move);
                }
                else{
                    checkForWin(mode, "scissors", move);
                }
            })
        })
    }
    else{
        let choices = [];

        choiceImages.forEach(image => {
            image.addEventListener("click", event =>{
                info.textContent = "Player 2's move:";
                if (event.target.id === "rock"){
                    choices[choices.length] = "rock";
                }
                else if (event.target.id === "paper"){
                    choices[choices.length] = "paper";
                }
                else{
                    choices[choices.length] = "scissors";
                }

                if (choices.length === 2){ checkForWin(mode, choices[0], choices[1]); choices = []; }
            })
        })
    }
}

function checkForWin(mode, player1, playerCPU){
    let secPlayer;
    const player1ScoreElement = document.getElementById("player1Score");
    const player2ScoreElement = document.getElementById("player2Score");
    let player1Score = Number(player1ScoreElement.textContent);
    let player2Score = Number(player2ScoreElement.textContent);

    if (mode === "pvp"){
        info.textContent = "Player 1's move:";
        secPlayer = "2";
    }
    else {
        secPlayer = "CPU";

        let ranNum = Math.random();
        if (ranNum <= 0.333333333){ playerCPU = "rock"; }
        else if (ranNum <= 0.666666666){ playerCPU = "paper"; }
        else {playerCPU = "scissors"; }

        console.log("CPU move: " + playerCPU);
    }

    if (player1 === "rock"){
        if (playerCPU === "rock"){ gameDisplay.textContent = "Draw"; player1Score++; player2Score++; }
        else if (playerCPU === "scissors"){ gameDisplay.textContent = "Player 1 has won"; player1Score++; }
        else {gameDisplay.textContent = "Player " + secPlayer + " has won"; player2Score++;}
    }
    else if (player1 === "scissors"){
        if (playerCPU === "rock"){ gameDisplay.textContent = "Player " + secPlayer + " has won"; player2Score++; }
        else if (playerCPU === "scissors"){ gameDisplay.textContent = "Draw"; player1Score++; player2Score++; }
        else {gameDisplay.textContent = "Player 1 has won"; player1Score++; }
    }
    else{
        if (playerCPU === "rock"){ gameDisplay.textContent = "Player 1 has won"; player1Score++; }
        else if (playerCPU === "scissors"){ gameDisplay.textContent = "Player " + secPlayer + " has won"; player2Score++; }
        else {gameDisplay.textContent = "Draw"; player1Score++; player2Score++; }
    }

    player1ScoreElement.textContent = player1Score;
    player2ScoreElement.textContent = player2Score;

    gameDisplay.classList.add("gameLog");

    setTimeout(() => {
    gameDisplay.classList.remove("gameLog");}, 500)
}

function returnToHome(){
    let choiceImages = document.querySelectorAll(".choiceImages");

    choiceImages.forEach(choiceImage => {
        choiceImage.remove();
    })

    document.getElementById("scoreBoard").remove();
    document.getElementById("home").remove();

    let gameImages = document.querySelectorAll(".gameImage");

    gameImages.forEach(gameImage => {
        gameImage.style.display = "inline";
    })

    info.textContent = "Choose a mode to play :)";
}