window.onload = function() {
    const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
    const scoreListElement = document.getElementById('scoreList');

    scoreBoard.sort((a, b) => b.score - a.score); // Sorterer score fra høyest til lavest

    scoreBoard.forEach(entry => {
        let listItem = document.createElement('li');
        listItem.textContent = `${entry.username}: ${entry.score}`;
        scoreListElement.appendChild(listItem);
    });
};

setTimeout(() => {
    const username = localStorage.getItem('username');
    const currentScore = { username: username, score: score };
    const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
    scoreBoard.push(currentScore);
    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
    
}, 30000);

