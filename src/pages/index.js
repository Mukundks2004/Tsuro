function gotoGame() {
    window.location.href = "public/gamepage.html";
}

const messageElement = document.getElementById('messagePlace');

document.getElementById("gotoGamePage").addEventListener("click", gotoGame);
