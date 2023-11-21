document.getElementById('startButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if(username) {
        localStorage.setItem('username', username);
        window.location.href = 'index.html'; 
    } else {
        alert('Vennligst skriv inn et navn.');
    }
});

document.getElementById('scoreboardButton').addEventListener('click', function() {
    window.location.href = 'scoreboard.html';
});


