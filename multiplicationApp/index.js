const rand = Math.ceil(Math.random() * 10);
const rand2 = Math.ceil(Math.random() * 10);

const n1 = document.getElementById("question");
const formElement = document.getElementById("form");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");



n1.innerText = "What is answer of " + rand + " * " + rand2;
scoreElement.innerText = score;
let score = JSON.parse(localStorage.getItem("score"));

const correctAns = rand * rand2;

if (!score) {
    score = 0;
}

formElement.addEventListener("Submit", () => {
    const userAns = +inputElement.textContent;
    if (userAns == correctAns) {
        score++;
        updateLocalStorage();
    }
    else {
        score--;
        updateLocalStorage();
    }
});

function updateLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score));
}