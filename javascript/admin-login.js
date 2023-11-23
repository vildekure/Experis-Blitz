function login() {
    // login functionality 
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // authentication
    if(username === "admin" && password === "secret") {
      // Redirect to admin dashboard
      window.location.href = 'admin-dashboard.html';
    } else {
      alert('Feil brukernavn eller passord!');
    }
  }