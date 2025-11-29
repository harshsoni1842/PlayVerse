let userCount = 0;
let compCount = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score")
const compScorePara = document.querySelector("#comp-score")


const gencompchoise = () => {
    const options = ["rock", "paper", "scissors"];
    const randIndex = Math.floor(Math.random() * 3);
    return options[randIndex];
};
const showUserWiner = (userwin, userChoice, compChoice) => {
    if (userwin) {
        userCount++;
        userScorePara.innerText = userCount ;
        msg.innerText =` You win! your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compCount++;
        compScorePara.innerText = compCount ;
        msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red"
    }
};
const playGame = (userChoice) => {
    // const userChoice = 
    // console.log(userChoice);
    const compChoice = gencompchoise();
    // console.log(compChoice);

    if (userChoice === compChoice) {
        msg.innerText = "Match Draw"
        msg.style.backgroundColor = "gray"
        // console.log("match Draw")
    } else {
        let userwin = true;
        if (compChoice === "paper") {
            userwin = userChoice === "rock" ? false : true;
        } else if (compChoice === "rock") {
            userwin = userChoice === "scissor" ? false : true;
        } else {
            userwin = userChoice === "paper" ? false : true;
        }
        console.log(userwin);
        showUserWiner(userwin, userChoice, compChoice);
    }
};
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
});