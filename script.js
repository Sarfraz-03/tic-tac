let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let currentPlayer = "X";
let gameActive = true;

// Initialize the game
const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const resetButton = document.getElementById("reset");

function initializeBoard() {
    boardElement.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

// Check if a player has won
function checkWinner() {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }
    return false;
}

// Check if the board is full
function checkTie() {
    return board.flat().every(cell => cell !== "");
}

// Handle a cell click
function handleCellClick(e) {
    if (!gameActive) return;
    
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWinner()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            resetButton.classList.remove("hidden");
        } else if (checkTie()) {
            messageElement.textContent = "It's a tie!";
            gameActive = false;
            resetButton.classList.remove("hidden");
        } else {
            currentPlayer = currentPlayer === "X" ? "Y" : "X";
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Reset the game
function resetGame() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    currentPlayer = "X";
    gameActive = true;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    resetButton.classList.add("hidden");
    initializeBoard();
}

// Initialize everything
initializeBoard();
messageElement.textContent = `Player ${currentPlayer}'s turn`;
resetButton.addEventListener("click", resetGame);
