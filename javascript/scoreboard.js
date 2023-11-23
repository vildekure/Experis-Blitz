window.onload = function() {
    const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
    const scoreBoardContainer = document.getElementById('scoreBoardContainer');

    scoreBoard.sort((a, b) => b.score - a.score);

    scoreBoard.forEach((entry, index) => {    
        let container = document.createElement('div');
        container.classList.add('playerContainer'); 

        let rankElement = document.createElement('p');
        rankElement.textContent = `${index + 1}.`;
        container.appendChild(rankElement);

        let playerElement = document.createElement('p');
        playerElement.textContent = `${entry.username}`;
        container.appendChild(playerElement);

        let scoreElement = document.createElement('p');
        scoreElement.textContent = `${entry.score} points`;
        container.appendChild(scoreElement);

        scoreBoardContainer.appendChild(container);
    });
};

setTimeout(() => {
    const username = localStorage.getItem('username');
    const currentScore = { username: username, score: score };
    const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
    scoreBoard.push(currentScore);
    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
}, 30000);

document.getElementById('playAgainButton').addEventListener('click', function() {
    window.location.href = 'homepage.html';
});
