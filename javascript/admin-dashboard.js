
function saveScore(username, phone, email, score) {
    const newEntry = { username, phone, email, score };
    const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
    scoreBoard.push(newEntry);
    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
}

window.onload = function() {
    const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
    const tableBody = document.querySelector('#adminContent table tbody');

    scoreBoard.sort((a, b) => b.score - a.score);

    scoreBoard.forEach((entry, index) => {
        let row = tableBody.insertRow();
        let cellRank = row.insertCell(0);
        let cellName = row.insertCell(1);
        let cellPhone = row.insertCell(2);
        let cellEmail = row.insertCell(3);
        let cellScore = row.insertCell(4);

        cellRank.innerHTML = index < 3 ? `<span class="medal">${['🥇', '🥈', '🥉'][index]}</span>` : '';
        cellName.textContent = entry.username;
        cellPhone.textContent = entry.phone;
        cellEmail.textContent = entry.email;
        cellScore.textContent = entry.score;
    });
};

function deleteHistory() {
    localStorage.removeItem('scoreBoard');
    const tableBody = document.querySelector('#adminContent table tbody');
    tableBody.innerHTML = '';
}


function logout() {
    window.location.href = '/';
}


document.getElementById('deleteButton').addEventListener('click', deleteHistory);

    document.getElementById('logoutButton').addEventListener('click', function() {
        window.location.href = '../pages/homepage.html'; // Endrer URL til hjemmesiden
    });


document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const score = parseInt(document.getElementById('score').value, 10);

    saveScore(username, phone, email, score);


    window.location.reload();
});
