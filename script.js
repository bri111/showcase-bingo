document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("bingo-board");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");
  const rulesPopup = document.getElementById("rules-popup");
  const rulesBtn = document.getElementById("rules-btn");
  const closeRules = document.getElementById("close-rules");
  const resetPopup = document.getElementById("reset-popup");
  const confirmReset = document.getElementById("confirm-reset");
  const cancelReset = document.getElementById("cancel-reset");

  function generateBingoCard() {
    board.innerHTML = "";
    board.style.gridTemplateColumns = "repeat(3, 1fr)";
    statusText.style.display = "none";

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("bingo-cell");
      cell.textContent = "TORCH"; // ← Add this line to label the cell

      cell.addEventListener("click", function () {
        cell.classList.toggle("marked");
        checkWin();
      });

      board.appendChild(cell);
    }
  }

  function checkWin() {
    const cells = board.querySelectorAll(".bingo-cell");
    const allMarked = Array.from(cells).every(cell => cell.classList.contains("marked"));

    if (allMarked) {
      declareWin();
    } else {
      statusText.style.display = "none";
    }
  }

  function declareWin() {
    statusText.style.display = "block";
  }

  // Button and popup logic
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
