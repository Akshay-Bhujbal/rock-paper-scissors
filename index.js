
let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let compScore = parseInt(localStorage.getItem('compScore')) || 0;

const choices = document.querySelectorAll('.choice');
const choiceContainer = document.querySelector('.choices');
const result = document.querySelector('.selected');
const msg = document.querySelector('.msg');
const playAgainButton = document.querySelector(".play");

const userScorePara = document.querySelector("#user-score")
const compScorePara = document.querySelector("#comp-score")

const resultUser = document.getElementsByClassName('user-choice')
const resultComp = document.getElementsByClassName('comp-choice')
const resultWinLose = document.getElementsByClassName('win-lose')

const rulesButton = document.querySelector(".rules")
const rulebox = document.querySelector(".rule-box")
const closeButton = document.querySelector(".close-btn")

const nextButton = document.querySelector('.next');
const hurrayPage = document.querySelector('.hurray-page');
const playAgainHurrayButton = document.querySelector('.hurray-content .play');
const rulesHurrayButton = document.querySelector('.hurray-page .rules');

userScorePara.innerText = userScore;
compScorePara.innerText = compScore;

const lines = document.querySelector(".line")

const updateScores = () => {
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('compScore', compScore);
};

const showHurrayPage = () => {
    hurrayPage.style.display = 'flex'; 
    result.style.display = 'none'; 
    nextButton.style.display = 'none'
};

const resumeGame = () => {
    hurrayPage.style.display = 'none';
    choiceContainer.style.display = 'flex';
    choiceContainer.style.flexDirection = 'column';
    result.style.display = 'none';
    nextButton.style.display = 'none'; 
    lines.style.display = 'flex'
    gameActive = true;
};

nextButton.addEventListener('click', showHurrayPage);

playAgainHurrayButton.addEventListener('click', resumeGame);

document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem("scriptExecuted")) {
        localStorage.setItem('userScore', 0);
        localStorage.setItem('compScore', 0);
        sessionStorage.setItem("scriptExecuted", "true");
    }
});

rulesButton.addEventListener('click', () => {
    rulebox.style.display = 'block';
});

rulesHurrayButton.addEventListener('click', () => {
    rulebox.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    rulebox.style.display = 'none';
})

let gameActive = true;

const genCompChoice = () => {
    const options = ['rock', 'paper', 'scissors'];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

function getBorder(userChoice,compChoice) {
    const userborder = document.querySelector('.userborder');
    const compborder = document.querySelector(".compborder");

    const borderoptions = {
        rock : "solid 15px #0074B6",
        paper : "solid 15px #FFA943",
        scissors : "solid 15px #BD00FF",
    }

    userborder.classList.add('circle');
    compborder.classList.add('circle');

    userborder.style.border = borderoptions[userChoice];

    compborder.style.border = borderoptions[compChoice];
    
}

function choosePick(userChoice,compChoice) {
    const userPickElement = document.getElementById('user-pick');
    const compPickElement = document.getElementById('comp-pick');

    const userChoiceOptions = {
        rock : "./images/rock.png",
        paper : "./images/paper.png",
        scissors : "./images/scissor.png",
    }
    
    userPickElement.src = userChoiceOptions[userChoice];
    compPickElement.src =userChoiceOptions[compChoice];
}

choices.forEach((choice)=>{
    choice.addEventListener('click', () => {
        if (!gameActive) return;

        const userChoice = choice.getAttribute('id');

        const compChoice = genCompChoice()
        
        choiceContainer.style.display = 'none';

        result.style.display = 'flex';
        result.style.justifyContent = 'center';
        result.style.alignItems = 'center';
        lines.style.display = 'none'

        Array.from(resultUser).forEach((element) => {
            element.style.display = 'flex';
            element.style.flexDirection = 'column';
            element.style.justifyContent = 'center';
        });

        Array.from(resultComp).forEach((element) => {
            element.style.display = 'flex';
            element.style.flexDirection = 'column';
            element.style.justifyContent = 'center';
            element.style.alignItems = 'center';
            element.style.gap = '50px'
        });

        Array.from(resultWinLose).forEach((element) => {
            element.style.display = 'flex';
            element.style.flexDirection = 'column';
            element.style.justifyContent = 'center';
            element.style.alignItems = 'center';
            element.style.textAlign = 'center'
            element.style.gap = '20px'
        });

        choosePick(userChoice,compChoice)

        getBorder(userChoice,compChoice)

        playGame(userChoice,compChoice)

        gameActive = false;
    })
})

const drawGame = () => {
    const userborder = document.querySelector('.userborder');
    const compborder = document.querySelector('.compborder');

    const h1Element = document.querySelector('.msg h1');
    const h2Element = document.querySelector('.msg h2');
    const buttonElement = document.querySelector('.play');
    const spanElement = buttonElement.querySelector('span');

    h1Element.innerText = "TIE UP";   
    spanElement.innerText = 'REPLAY'; 
    h2Element.style.display = "none";
    nextButton.style.display = 'none';

    userborder.classList.remove('winner-glow');
    compborder.classList.remove('winner-glow');
};

const showWinner = (userWin) =>{
    const userborder = document.querySelector('.userborder');
    const compborder = document.querySelector('.compborder');

    const h1Element = document.querySelector('.msg h1');
    const h2Element = document.querySelector('.msg h2');
    const buttonElement = document.querySelector('.play');
    const rulesButton = document.querySelector(".rules")
    const nextButton = document.querySelector('.next');
    
    const spanElement = buttonElement.querySelector('span');

    spanElement.innerText = 'PLAY AGAIN';

    userborder.classList.remove('winner-glow');
    compborder.classList.remove('winner-glow');

    if (userWin) {
        userScore++;
        localStorage.setItem('userScore',userScore);
        userScorePara.innerText = userScore;
        msg.innerHTML = ""

        const h1 = document.createElement('h1');
        const h2 = document.createElement('h2');

        h1.innerText = "YOU WIN"
        h2.innerText = "AGAINST PC"

        msg.appendChild(h1);
        msg.appendChild(h2);

        userborder.classList.add('winner-glow');

        rulesButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';

        console.log("Rules Button Display:", rulesButton.style.display);
        console.log("Next Button Display:", nextButton.style.display);


        rulesButton.style.order = 1;
        nextButton.style.order = 2;
    
    } else if(userWin === false) {
        compScore++;
        localStorage.setItem('compScore',compScore)
        compScorePara.innerText = compScore;
        msg.innerHTML = ""

        const h1 = document.createElement('h1')
        const h2 = document.createElement('h2')

        h1.innerText = "YOU LOST"
        h2.innerText = "AGAINST PC"

        msg.appendChild(h1);
        msg.appendChild(h2);

        compborder.classList.add('winner-glow');

        nextButton.style.display = 'none';
        rulesButton.style.display = 'inline-block';

        rulesButton.style.order = 1;
    }
    const sessionKey = "gameSession";
};

const playGame = (userChoice,compChoice) =>{
    console.log('user choice =', userChoice);
    console.log('comp choice =', compChoice);

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === 'rock') {
            userWin = compChoice === 'paper' ? false : true;
        } else if (userChoice === 'paper') {
            userWin = compChoice === 'scissors' ? false : true;
        } else {
            userWin = compChoice === 'rock' ? false : true;
        }
        showWinner(userWin);
    }
}

playAgainButton.addEventListener('click', () => {
    result.style.display = 'none'
    choiceContainer.style.display = 'flex';
    choiceContainer.style.flexDirection = 'column';
    lines.style.display = 'flex';

    nextButton.style.display = 'none'

    gameActive = true;
})
