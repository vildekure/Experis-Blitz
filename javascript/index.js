document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    let score = 0;
    let gameContainer = document.getElementById('gameContainer');
    let scoreDisplay = document.getElementById('score');

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

