logins = {
    "Mukund" : "123",
    "Test" : "1"
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if (username in logins && logins[username] === password) {
        window.location.href = "gamepage.html";
    } else {
        alert("Incorrect username or password. Please try again.");
    }
});
