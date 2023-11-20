document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    let score = 0;
    let gameContainer = document.getElementById('gameContainer');
    let scoreDisplay = document.getElementById('score');

    function updateScore() {
        score++;
        scoreDisplay.textContent = `Poeng: ${score}`;
    }

    function createBall() {
        let ball = document.createElement('div');
        ball.classList.add('ball');

        // Plasser ballen tilfeldig
        ball.style.top = `${Math.random() * 100}vh`;
        ball.style.left = `${Math.random() * 100}vw`;

        ball.addEventListener('click', () => {
            updateScore();
            ball.remove();
            createBall();
        });

        gameContainer.appendChild(ball);
    }

    createBall();

    setTimeout(() => {
        gameContainer.innerHTML = '';
        alert(`Spillet er over! Du fikk ${score} poeng.`);
    }, 30000); // Spillet varer i 30 sekunder
}

