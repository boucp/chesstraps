function toggleTraps(id) {
  const list = document.getElementById(id);
  list.style.display = list.style.display === "block" ? "none" : "block";
}

const pieces = {
  wP: '../images/wP.png',
  wR: '../images/wR.png',
  wN: '../images/wN.png',
  wB: '../images/wB.png',
  wQ: '../images/wQ.png',
  wK: '../images/wK.png',
  bP: '../images/bP.png',
  bR: '../images/bR.png',
  bN: '../images/bN.png',
  bB: '../images/bB.png',
  bQ: '../images/bQ.png',
  bK: '../images/bK.png',
};

let boardDiv, game, history = [], moveIndex = 0, isFlipped = false;

function setupBoard(pgn) {
  boardDiv = document.getElementById("board");
  game = new Chess();

  game.reset();
  game.load_pgn(pgn);
  history = game.history();
  game.reset();
  moveIndex = 0;
  drawBoard();
}

function drawBoard() {
  boardDiv.innerHTML = "";
  const position = game.board();

  const ranks = isFlipped ? [...Array(8).keys()] : [...Array(8).keys()].reverse(); // 0-7 or 7-0
  const files = isFlipped ? [...Array(8).keys()].reverse() : [...Array(8).keys()]; // 7-0 or 0-7

  for (let r of ranks) {
    for (let c of files) {
      const square = document.createElement("div");
      square.className = "square " + ((r + c) % 2 === 0 ? "light" : "dark");
      const piece = position[r][c];
      if (piece) {
        const img = document.createElement("img");
        const code = piece.color + piece.type.toUpperCase();
        img.src = pieces[code];
        square.appendChild(img);
      }
      boardDiv.appendChild(square);
    }
  }
}

function nextMove() {
  if (moveIndex < history.length) {
    game.move(history[moveIndex++]);
    drawBoard();
  }
}

function prevMove() {
  if (moveIndex > 0) {
    game.undo();
    moveIndex--;
    drawBoard();
  }
}

function flipBoard() {
  isFlipped = !isFlipped;
  drawBoard();
}
