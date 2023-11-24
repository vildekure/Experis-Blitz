document
	.getElementById("startButtonGamePage")
	.addEventListener("click", startGame);

var gameMusic = document.getElementById("gameMusic");
var isMuted = localStorage.getItem("isMuted") === "true";
gameMusic.muted = isMuted;
gameMusic.volume = 0.4;
gameMusic.play();

function startGame() {
	document.getElementById("startButtonGamePage").style.display = "none";

	let score = 0;
	let gameContainer = document.getElementById("gameContainer");
	let scoreDisplay = document.getElementById("score");
	let timerDisplay = document.getElementById("timer");
	let timeLeft = 20;

	timerDisplay.textContent = formatTime(timeLeft);

	// Start et intervall som teller ned hvert sekund
	let timerId = setInterval(() => {
		timeLeft -= 1;
		timerDisplay.textContent = formatTime(timeLeft);

		// Når nedtellingen når 0, stopper vi intervallet
		if (timeLeft <= 0) {
			clearInterval(timerId);
		}
	}, 1000);

	function updateScore(points) {
		score += points;
		scoreDisplay.textContent = `Poeng: ${score}`;
	}

	function createBall() {
		let ball = document.createElement("div");

		ball.classList.add("ball");

		ball.style.top = `${Math.random() * 60}vh`;
		ball.style.left = `${Math.random() * 60}vw`;

		let ballType = Math.random();
		if (ballType < 0.7) {
			ball.style.backgroundImage = "url('../images/BlueBig.gif')";
			ball.onclick = () => handleBallClick(ball, 2);
			setTimeout(
				() => removeBall(ball),
				Math.random() * (3000 - 1500) + 1500
			);
		} else if (ballType < 0.85) {
			ball.style.backgroundImage = "url('../images/Alert.gif')";
			ball.onclick = () => handleBallClick(ball, -2);
			setTimeout(
				() => removeBall(ball),
				Math.random() * (2000 - 1500) + 1500
			);
		} else {
			ball.style.backgroundImage = "url('../images/GoldExperis.gif')";
			ball.onclick = () => handleBallClick(ball, 5);
			setTimeout(
				() => removeBall(ball),
				Math.random() * (2000 - 1500) + 1500
			);
		}

		ball.style.backgroundSize = "cover";
		ball.style.backgroundPosition = "center";
		ball.style.backgroundRepeat = "no-repeat";

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
    
    // Create a new points element
    let pointsDiv = document.createElement("div");
    pointsDiv.classList.add("points");
    pointsDiv.textContent = (points > 0 ? "+" : "") + points; // Add '+' sign for positive points
    pointsDiv.style.left = ball.style.left;
    pointsDiv.style.top = ball.style.top;

    // Add the points element to the game container
    gameContainer.appendChild(pointsDiv);

    // Animate the points element
    setTimeout(() => {
        pointsDiv.style.opacity = 0;
        pointsDiv.style.top = parseFloat(ball.style.top) - 10 + "vh";
    }, 100);

    // Remove the points element after animation
    setTimeout(() => {
        pointsDiv.remove();
    }, 1000); // Adjust time based on your animation duration

    // Remove the ball and create a new one
    ball.remove();
    createBall();
	}

	gameContainer.innerHTML = "";
	for (let i = 0; i < 4; i++) {
		createBall();
	}

	setTimeout(() => {
		gameContainer.innerHTML = "";
		const username = localStorage.getItem("username");
		const email = localStorage.getItem("email");
		const phoneNumber = localStorage.getItem("phoneNumber");
		const currentScore = {
			username: username,
			score: score,
			email: email,
			number: phoneNumber,
		};
		const scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];
		scoreBoard.push(currentScore);
		localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));

		document.getElementById("finalScore").textContent = score;
		document.getElementById("endGameModal").style.display = "block";

		document
			.getElementById("viewLeaderboard")
			.addEventListener("click", () => {
				window.location.href = "scoreboard.html";
			});

		// Håndter klikk på "Spill igjen" knappen
		document.getElementById("newgameButton").addEventListener("click", () => {
			window.location.href = "homepage.html";
		});
	}, 20000);
}

function formatTime(seconds) {
	return seconds > 9 ? `00:${seconds}` : `00:0${seconds}`;
}
