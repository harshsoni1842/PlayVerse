(function () {
    console.log("Reaction tester script starting");
    let reactionStart = 0;
    let timeout = null;
    let isGreen = false;
    let best = null;
    
    const box = document.getElementById("box");
    const result = document.getElementById("result");
    const bestLabel = document.getElementById("best");
    const resetBtn = document.getElementById("resetBest");

    function updateBestLabel() {
        bestLabel.textContent = "Best: " + (best === null ? "—" : best + " ms");
    }
    
    function randomDelay() {
        return Math.floor(Math.random() * 3000) + 1000; // 1s - 4s
    }
    
    function turnGreen() {
        box.style.background = "var(--green)";
        box.textContent = "CLICK!";
        reactionStart = Date.now();
        isGreen = true;
        console.log("turned green at", reactionStart);
    }
    
    function startGame() {
      if (timeout) { clearTimeout(timeout); timeout = null; }
      isGreen = false;
      box.style.background = "var(--red)";
      box.textContent = "Wait for green...";
      result.textContent = "";
      
      timeout = setTimeout(turnGreen, randomDelay());
      console.log("scheduled green in", timeout ? "a bit" : "unknown");
    }

  function handleClick() {
      if (isGreen) {
        const reactionTime = Date.now() - reactionStart;
        result.textContent = "Your Reaction Time: " + reactionTime + " ms";
        
        if (best === null || reactionTime < best) {
            best = reactionTime;
            updateBestLabel();
          }
          
          isGreen = false;
          clearTimeout(timeout);
          timeout = setTimeout(startGame, 600);
          console.log("valid click:", reactionTime, "ms");
      } else {
        if (timeout) { clearTimeout(timeout); timeout = null; }
        result.textContent = "Too early! Try again.";
        isGreen = false;
        
        timeout = setTimeout(startGame, 800);
        console.log("clicked too early");
      }
  }
    
    function handleKey(e) {
        if (e.code === "Space" || e.code === "Enter") {
            e.preventDefault();
            handleClick();
        }
    }
    
    box.addEventListener("click", handleClick);
    box.addEventListener("keydown", handleKey);
    
    resetBtn.addEventListener("click", function () {
        best = null;
        updateBestLabel();
    });
    
    updateBestLabel();
    startGame();
    
    // helpful cleanup when leaving page
    window.addEventListener("beforeunload", function () {
        if (timeout) clearTimeout(timeout);
    });
})();