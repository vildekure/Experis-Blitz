function saveScore(username, number, email, score) {
	const newEntry = { username, number, email, score };
	const scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];
	scoreBoard.push(newEntry);
	localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
}

window.onload = function () {
	const scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];
	const tableBody = document.querySelector("#adminContent table tbody");

	scoreBoard.sort((a, b) => b.score - a.score);

	scoreBoard.forEach((entry, index) => {
		let row = tableBody.insertRow();
		let cellRank = row.insertCell(0);
		let cellName = row.insertCell(1);
		let cellNumber = row.insertCell(2);
		let cellEmail = row.insertCell(3);
		let cellScore = row.insertCell(4);

		let deleteCell = row.insertCell(5); 
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteUserButton";
        deleteButton.onclick = function() { deleteUser(entry.username); }; 
        deleteCell.appendChild(deleteButton);


		cellRank.innerHTML =
			index < 3
				? `<span class="medal">${["🥇", "🥈", "🥉"][index]}</span>`
				: "";
		cellName.textContent = entry.username;
		cellNumber.textContent = entry.number;
		cellEmail.textContent = entry.email;
		cellScore.textContent = entry.score;
	});
};

function deleteHistory() {
	if (confirm("Are you sure you want to delete all data. YOU CAN'T RESTORE IT!")) {
        localStorage.removeItem("scoreBoard");
        const tableBody = document.querySelector("#adminContent table tbody");
        tableBody.innerHTML = "";
    }
}

function deleteUser(username) {
    if (confirm(`Are you sure you want to delete: ${username}?`)) {
        let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];
        scoreBoard = scoreBoard.filter(entry => entry.username !== username);
        localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
        location.reload(); // Reload the page to update the table
    }
}


function logout() {
	window.location.href = "/";
}

document
	.getElementById("deleteButton")
	.addEventListener("click", deleteHistory);

document.getElementById("logoutButton").addEventListener("click", function () {
	window.location.href = "../pages/homepage.html"; // Endrer URL til hjemmesiden
});
