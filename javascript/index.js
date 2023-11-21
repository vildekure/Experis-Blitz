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

        ball.style.top = `${Math.random() * 65}vh`;
        ball.style.left = `${Math.random() * 65}vw`;

        let ballType = Math.random();
        if (ballType < 0.6) { 
            ball.style.backgroundColor = 'green';
            ball.onclick = () => handleBallClick(ball, 1);
            console.log("hehe")
        } else if (ballType < 0.9) {
            ball.style.backgroundColor = 'red';
            ball.onclick = () => handleBallClick(ball, -1);
        } else { 
            ball.style.backgroundColor = 'gold';
            ball.onclick = () => handleBallClick(ball, 2);
        }

        gameContainer.appendChild(ball);
    }

    function handleBallClick(ball, points) {
        updateScore(points);
        ball.remove();
        createBall();
    }

    gameContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        createBall();
    }

    setTimeout(() => {
        gameContainer.innerHTML = '';
        alert(`Spillet er over! Du fikk ${score} poeng.`);
    }, 30000);
}

