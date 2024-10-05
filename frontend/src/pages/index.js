function gotoGame() {
    window.location.href = "gamepage.html";
}

const messageElement = document.getElementById('messagePlace');

const fetchHello = async () => {
    const response = await fetch('http://localhost:3000/hello');
    const data = await response.json();
    messageElement.textContent = data.message;
};

const fetchGoodbye = async () => {
    const response = await fetch('http://localhost:3000/goodbye');
    const data = await response.json();
    messageElement.textContent = data.message;
};

const fetchWow = async () => {
    const response = await fetch('http://localhost:3000/wow');
    const data = await response.json();
    messageElement.textContent = data.message;
};

document.getElementById("gotoGamePage").addEventListener("click", gotoGame);
document.getElementById("getHello").addEventListener("click", fetchHello);
document.getElementById("getGoodbye").addEventListener("click", fetchGoodbye);
document.getElementById("getWow").addEventListener("click", fetchWow);