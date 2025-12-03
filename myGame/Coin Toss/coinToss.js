function play(userChoice) {
    const coin = document.getElementById("coin");
    const result = document.getElementById("result");

    // reset result immediately
    result.textContent = "";

    // random result
    const outcomes = ["heads", "tails"];
    const random = outcomes[Math.floor(Math.random() * outcomes.length)];

    // trigger flip animation
    coin.classList.remove("flip");
    void coin.offsetWidth; // restart animation
    coin.classList.add("flip");

    // After flip animation ends
    setTimeout(() => {
        coin.textContent = random.toUpperCase();

        if (userChoice === random) {
            result.textContent = "You Win! 🎉";
        } else {
            result.textContent = "You Lose! 😢";
        }
    }, 800); // must match CSS transition time
}
