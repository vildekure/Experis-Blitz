var gameMusic = document.getElementById("gameMusic");

var isMuted = localStorage.getItem("isMuted") === "true";

document.addEventListener("DOMContentLoaded", function(){
	var gameMusic = document.getElementById("gameMusic");
	gameMusic.play();
	gameMusic.volume = 0.4;
})

function toggleMute() {
	isMuted = !isMuted;
	localStorage.setItem("isMuted", isMuted);
	gameMusic.muted = isMuted;
	document.getElementById("muteButton").src = isMuted
		? "../images/SoundButtonMuted.png"
		: "../images/SoundButton.png";
}

window.onload = function () {

	var gameMusic = document.getElementById("gameMusic");
	gameMusic.play();
	gameMusic.volume = 0.4;

	// Fetch the scores from localStorage
	const scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];
	scoreBoard.sort((a, b) => b.score - a.score); // Sort to get the highest scores first
	// Get the top three scores, if they exist
	const topThree = scoreBoard.slice(0, 3);

	// Function to update the score display
	const updateScoreDisplay = (elementId, position, entry) => {
		const element = document.getElementById(elementId);
		if (entry) {
			element.querySelector(".name").textContent = entry.username;
			element.querySelector(
				".score"
			).textContent = `${entry.score} Points`;
		} else {
			element.querySelector(".name").textContent = "-";
			element.querySelector(".score").textContent = "0 Points";
		}
	};

	// Update the display for the top three entries
	updateScoreDisplay("firstPlace", 1, topThree[0]);
	updateScoreDisplay("secondPlace", 2, topThree[1]);
	updateScoreDisplay("thirdPlace", 3, topThree[2]);


	// Set the initial state of the music based on the mute state
	gameMusic.muted = isMuted;
	document.getElementById("muteButton").src = isMuted
		? "../images/SoundButtonMuted.png"
		: "../images/SoundButton.png";

	// Event listener for mute button
	document.getElementById("muteButton").addEventListener("click", toggleMute);
};

// When the user clicks the start button, open the modal
document.getElementById("startButton").addEventListener("click", function () {
	document.getElementById("userModal").style.display = "block";
});

// When the user clicks on <span> (x), close the modal
document.querySelector(".close").addEventListener("click", function () {
	document.getElementById("userModal").style.display = "none";
});

document.getElementById("startButton").addEventListener("click", function () {
	var sound = document.getElementById("buttonSound");
	sound.play();
	sound.volume = 9;
});


// When the user submits the form
document
	.getElementById("userInfoForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const username = document.getElementById("username").value;
		const phoneNumber = document.getElementById("number").value;
		const email = document.getElementById("email").value;

		if (
			username &&
			validatePhoneNumber(phoneNumber) &&
			validateEmail(email)
		) {
			localStorage.setItem("username", username);
			localStorage.setItem("phoneNumber", phoneNumber);
			localStorage.setItem("email", email);
			document.getElementById("userModal").style.display = "none";
			window.location.href = "index.html";
		} else {
			alert("Please enter valid information.");
		}
	});

document
	.getElementById("scoreboardButton")
	.addEventListener("click", function () {
		window.location.href = "scoreboard.html";
	});

function validatePhoneNumber(number) {
	const phoneRegex = /^[0-9]{8}$/;
	return phoneRegex.test(number);
}

function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return emailRegex.test(email);
}
