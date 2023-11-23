document.getElementById('startButtonGamePage').addEventListener('click', startGame);

function startGame() {
    let score = 0;
    let gameContainer = document.getElementById('gameContainer');
    let scoreDisplay = document.getElementById('score');
    let timerDisplay = document.getElementById('timer');
    let timeLeft = 10; // Spill varer i 10 sekunder

    // Oppdater timeren på skjermen umiddelbart
    timerDisplay.textContent = formatTime(timeLeft);

    // Start et intervall som teller ned hvert sekund
    let timerId = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.textContent = formatTime(timeLeft);

        // Når nedtellingen når 0, stopper vi intervallet
        if (timeLeft <= 0) {
            clearInterval(timerId);
            // Du kan legge til ekstra logikk her om nødvendig når tiden går ut
        }
    }, 1000);

    function updateScore(points) {
        score += points;
        scoreDisplay.textContent = `Poeng: ${score}`;
    }

    function createBall() {
        let ball = document.createElement('div');


        ball.classList.add('ball');

        ball.style.top = `${Math.random() * 60}vh`;
        ball.style.left = `${Math.random() * 60}vw`;

        let ballType = Math.random();
        if (ballType < 0.7) { 
            ball.style.backgroundImage = "url('../images/BlueBig.gif')";
            ball.onclick = () => handleBallClick(ball, 2);
            setTimeout(() => removeBall(ball), Math.random()* (3000 - 1500) + 1500);
        } else if (ballType < 0.85) {
            ball.style.backgroundImage = "url('../images/Alert.gif')";
            ball.onclick = () => handleBallClick(ball, -2);
            setTimeout(() => removeBall(ball), Math.random()* (2000 - 1500) + 1500);
        } else { 
            ball.style.backgroundImage = "url('../images/GoldExperis.gif')";
            ball.onclick = () => handleBallClick(ball, 5);
            setTimeout(() => removeBall(ball), Math.random()* (2000 - 1500) + 1500);
        }

        ball.style.backgroundSize = 'cover';
        ball.style.backgroundPosition = 'center';
        ball.style.backgroundRepeat = 'no-repeat';
    
        gameContainer.appendChild(ball);
    }
    
    function removeBall(ball) {
        if (ball.parentElement) {
            ball.remove();
            createBall(); 
        }
    }

    function handleBallClick(ball, points) {
        updateScore(points);
        ball.remove();
        createBall();
    }

    gameContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        createBall();
    }

    setTimeout(() => {
        clearInterval(timerId); // Stopper intervallet
        timerDisplay.textContent = '00:00'; 
        gameContainer.innerHTML = '';
        const username = localStorage.getItem('username');
        const currentScore = { username: username, score: score };
        const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
        scoreBoard.push(currentScore);
        localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));

        let userChoice = confirm(`Spillet er over! Du fikk ${score} poeng. Vil du se ledertavlen?`);
        if (userChoice) {
            window.location.href = 'scoreboard.html';
        } else {
            window.location.reload();
        }
    }, 10000);
}

function formatTime(seconds) {
    // Formatterer tiden som en streng MM:SS
    return seconds > 9 ? `00:${seconds}` : `00:0${seconds}`;
}
