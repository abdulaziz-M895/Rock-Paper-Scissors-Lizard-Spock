const rulesBtn = document.querySelector("button.rules-btn");
const rules = document.querySelector(".rules");
const rulesExit = document.querySelector(".rules .heading img");
const overlay = document.querySelector(".overlay");
const items = ["scissors", "paper", "rock", "lizard", "spock"];
const score = document.querySelector(".score h1");

// Show/Hide Rules
rulesBtn.addEventListener("click", () => {
  rules.classList.add("display-flex");
  overlay.classList.add("display-block");
  document.body.classList.add("min-height-100");
  document.querySelector("main.container").classList.add("min-height-100");

  setTimeout(() => {
    document
      .querySelector(".rules > img")
      .scrollIntoView();
  }, 200);
});

const hideBtns = [rulesExit, overlay];

hideBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    rules.classList.remove("display-flex");
    overlay.classList.remove("display-block");
    document.body.classList.remove("min-height-100");
    document.querySelector("main.container").classList.remove("min-height-100");
  })
);

// Set initial score
score.textContent = localStorage.getItem("score") || 0;

// Start the game
function startGame() {
  const playingBtns = document.querySelectorAll("article button");
  playingBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      score.textContent = localStorage.getItem("score") || 0;
      step2(btn);
    });
  });
}
startGame();

// Step 2: Display player and computer choices
function step2(btn) {
  const article = btn.parentElement;
  const originalBtnClone = btn.cloneNode(true);

  article.innerHTML = `
    <div class="step-2-player">
        <span>YOU PICKED</span>
    </div>
    <div class="step-2-player computer">
        <span>THE HOUSE PICKED</span>
    </div>`;
  article.classList.add("step-2");

  const step2Player = document.querySelector(".step-2-player");
  step2Player.classList.add("display-flex");
  step2Player.append(originalBtnClone);

  const step2Computer = document.querySelector(".step-2-player.computer");
  step2Computer.classList.add("display-flex");

  const computerChoice = document.createElement("button");
  computerChoice.classList.add("computer");
  step2Computer.append(computerChoice);

  // Delay height setting to ensure rendering is complete
  setTimeout(() => {
    const playerHeight = step2Player.querySelector("button").clientHeight;
    computerChoice.style.height = `${playerHeight}px`;
  }, 100);

  rotateComputerChoice(computerChoice);
}

// Rotate the computer choice to simulate selection
function rotateComputerChoice(computerChoice) {
  let currentIndex = 0;
  let rotationSpeed = 100; // Initial speed in milliseconds
  let rotating = true;

  function updateChoice() {
    if (!rotating) return;

    currentIndex = Math.floor(Math.random() * items.length);
    computerChoice.setAttribute("data-type", items[currentIndex]);
    computerChoice.innerHTML = `<img src="images/icon-${items[currentIndex]}.svg" alt="${items[currentIndex]}" />`;

    if (rotationSpeed < 600) {
      rotationSpeed += 30; // Slow down the rotation
    }

    setTimeout(() => {
      if (rotationSpeed >= 600) {
        rotating = false;
        finalizeComputerChoice(computerChoice);
      }
      updateChoice();
    }, rotationSpeed);
  }

  updateChoice();
}

// Finalize the computer choice and proceed to step 3
function finalizeComputerChoice(computerChoice) {
  const finalIndex = Math.floor(Math.random() * items.length);
  const finalChoice = items[finalIndex];
  computerChoice.setAttribute("data-type", finalChoice);
  computerChoice.classList.remove("computer");
  computerChoice.classList.add(finalChoice);
  computerChoice.innerHTML = `<img src="images/icon-${finalChoice}.svg" alt="${finalChoice}" />`;

  step3(computerChoice);
}

// Step 3: Determine the winner and display the result
function step3(computerChoice) {
  computerChoice.style.height = "auto";

  const player = document.querySelector(".step-2 button");
  const computer = document.querySelector(".step-2 .computer button");
  const playerValue = player.dataset.type;
  const computerValue = computer.dataset.type;

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("result");

  const message = document.createElement("span");
  messageDiv.appendChild(message);

  const messageBtn = document.createElement("button");
  messageBtn.textContent = "PLAY AGAIN";
  messageDiv.appendChild(messageBtn);

  let newScore = +localStorage.getItem("score") || +score.textContent;

  if (playerValue === computerValue) {
    computer.classList.add("win");
    player.classList.add("win");
    message.textContent = "DRAW";
  } else if (
    (playerValue === "scissors" &&
      (computerValue === "paper" || computerValue === "lizard")) ||
    (playerValue === "paper" &&
      (computerValue === "rock" || computerValue === "spock")) ||
    (playerValue === "rock" &&
      (computerValue === "scissors" || computerValue === "lizard")) ||
    (playerValue === "lizard" &&
      (computerValue === "paper" || computerValue === "spock")) ||
    (playerValue === "spock" &&
      (computerValue === "scissors" || computerValue === "rock"))
  ) {
    player.classList.add("win");
    message.textContent = "YOU WIN";
    newScore++;
  } else {
    computer.classList.add("win");
    message.textContent = "YOU LOSE";
    newScore--;
  }

  localStorage.setItem("score", newScore);
  score.textContent = newScore;

  player.parentElement.after(messageDiv);

  step4();
}

// Step 4: Reset the game for a new round
function step4() {
  const playAgain = document.querySelector(".result button");

  playAgain.addEventListener("click", () => {
    const article = document.querySelector("article");
    article.classList.remove("step-2");
    article.innerHTML = `
      <button class="pentagon">
        <img src="images/bg-pentagon.svg" alt="pentagon" class="pentagon" />
      </button>
      <button data-type="scissors" class="scissors">
        <img src="images/icon-scissors.svg" alt="scissors" />
      </button>
      <button data-type="paper" class="paper">
        <img src="images/icon-paper.svg" alt="paper" />
      </button>
      <button data-type="rock" class="rock">
        <img src="images/icon-rock.svg" alt="rock" />
      </button>
      <button data-type="lizard" class="lizard">
        <img src="images/icon-lizard.svg" alt="lizard" />
      </button>
      <button data-type="spock" class="spock">
        <img src="images/icon-spock.svg" alt="spock" />
      </button>
    `;
    startGame();
  });
}
