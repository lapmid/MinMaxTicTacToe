// Constants to represent players
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const COMPUTER = PLAYER_X;

// Initial variables
let START_PLAYER = 'X';
let currentPlayer = PLAYER_X;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

// Select elements
const ticTacToe = document.getElementById('tic-tac-toe');
const cells = document.querySelectorAll('.cell');
const messageContainer = document.getElementById('message-container');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

// Add click event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => cellClick(index));
});

// Function to handle cell click
function cellClick(index) {
    if (!gameOver && gameBoard[index] === '') {
        makeMove(index);
        if(!gameOver){
            const computerMove = getBestMoveFromMinMaxTable(gameBoard,START_PLAYER==COMPUTER);
            if(computerMove !== null && computerMove !== undefined)
                makeMove(computerMove);
        }
    }
}

function makeMove(index){
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        updateScore(currentPlayer);
        gameOver = true;
        setTimeout(()=>{
            resetGame();
        },2000);
    } else if (gameBoard.indexOf('') === -1) {
        message.textContent = "It's a draw!";
        gameOver = true;
        setTimeout(()=>{
            resetGame();
        },2000);
    } else {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a win
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => pattern.every(index => gameBoard[index] === player));
}

// Function to show the result message container
function showResultMessage() {
    messageContainer.style.top = '50%'; // Center the message vertically
    messageContainer.style.display = 'block';
}

// Function to hide the result message container and remove blur effect
function hideResultMessage() {
    // messageContainer.style.display = 'none';
    ticTacToe.classList.remove('game-over'); // Remove blur effect from the grid
}
// Function to update the score
function updateScore(player) {
    if (player === PLAYER_X) {
        scoreX++;
    } else {
        scoreO++;
    }
    scoreDisplay.textContent = `Player X: ${scoreX} - Player O: ${scoreO}`;
}

function checkGameOver(){
    if (checkWin(currentPlayer)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        updateScore(currentPlayer);
        gameOver = true;
        setTimeout(()=>{
            resetGame();
        },2000);
    } else if (gameBoard.indexOf('') === -1) {
        message.textContent = "It's a draw!";
        gameOver = true;
        setTimeout(()=>{
            resetGame();
        },2000);
    }
}
function resetGame(){
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove(PLAYER_X, PLAYER_O);
    });
    currentPlayer = (START_PLAYER === PLAYER_X) ? PLAYER_O : PLAYER_X;
    START_PLAYER = currentPlayer;
    gameOver = false;
    message.textContent = `Player ${currentPlayer}'s turn`;
    hideResultMessage();

    if(currentPlayer === COMPUTER){
        const computerMove = getBestMoveFromMinMaxTable(gameBoard,START_PLAYER == COMPUTER);
        if(computerMove !== null)
            makeMove(computerMove);
    }
}

// Initial message
message.textContent = `Player ${currentPlayer}'s turn`;
if(currentPlayer === COMPUTER){
    const computerMove = getBestMoveFromMinMaxTable(gameBoard,START_PLAYER===COMPUTER);
    if(computerMove !== null && computerMove !== undefined)
        makeMove(computerMove);
}
