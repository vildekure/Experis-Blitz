document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if(username) {
        localStorage.setItem('username', username);
        window.location.href = 'index.html'; 
    } else {
        alert('Vennligst skriv inn et navn.');
    }
});
