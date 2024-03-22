function redirect() {
  let dropdownColor = document.getElementById("dropdownColor")
  window.location.href = "gamepage.html?color=" + dropdownColor.value;
}

document.getElementById("startButton").addEventListener("click", redirect);
