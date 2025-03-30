document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("bingo-board");
  const resetButton = document.getElementById("reset");
  const rulesPopup = document.getElementById("rules-popup");
  const rulesBtn = document.getElementById("rules-btn");
  const closeRules = document.getElementById("close-rules");
  const resetPopup = document.getElementById("reset-popup");
  const confirmReset = document.getElementById("confirm-reset");
  const cancelReset = document.getElementById("cancel-reset");

  const winPopup = document.getElementById("win-popup");
  const closeWin = document.getElementById("close-win");
  const resetWin = document.getElementById("reset-win");

  const namePopup = document.getElementById("name-popup");
  const nameInput = document.getElementById("name-input");
  const saveName = document.getElementById("save-name");
  const cancelName = document.getElementById("cancel-name");

  let selectedCell = null; // Track which cell was clicked


  function generateBingoCard() {
    board.innerHTML = "";
    board.style.gridTemplateColumns = "repeat(3, 1fr)";
    winPopup.style.display = "none";

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("bingo-cell");
      cell.textContent = "TORCH";

      cell.addEventListener("click", function () {
        selectedCell = cell;
        nameInput.value = cell.textContent !== "TORCH" ? cell.textContent : "";
        namePopup.style.display = "block";
      });

      board.appendChild(cell);
    }
  }

  saveName.addEventListener("click", () => {
    if (selectedCell && nameInput.value.trim() !== "") {
      selectedCell.textContent = nameInput.value.trim();
      selectedCell.classList.add("marked");
      checkWin();
    }
    namePopup.style.display = "none";
    selectedCell = null;
  });

  cancelName.addEventListener("click", () => {
    namePopup.style.display = "none";
    selectedCell = null;
  });

  function checkWin() {
    const cells = board.querySelectorAll(".bingo-cell");
    const allMarked = Array.from(cells).every(cell => cell.classList.contains("marked"));

    if (allMarked) {
      declareWin();
    } else {
      winPopup.style.display = "none";

    }
  }

  function declareWin() {
    winPopup.style.display = "block";
  }

  // Popup controls
  closeWin.addEventListener("click", () => winPopup.style.display = "none");

  resetWin.addEventListener("click", () => {

    winPopup.style.display = "none";

    generateBingoCard(); // Re-generate the card
  });


  resetButton.addEventListener("click", () => resetPopup.style.display = "block");
  confirmReset.addEventListener("click", () => {
    resetPopup.style.display = "none";

    generateBingoCard();
  });
  cancelReset.addEventListener("click", () => resetPopup.style.display = "none");
  rulesBtn.addEventListener("click", () => rulesPopup.style.display = "block");
  closeRules.addEventListener("click", () => rulesPopup.style.display = "none");

  generateBingoCard();
});
