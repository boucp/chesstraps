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
if(!isFlipped){
  for (let r = 7; r >=0;r--) {
    for (let c = 7;c >=0;c--) {
      const square = document.createElement("div");
      square.className = "square " + ((r + c) % 2 === 0 ? "light" : "dark");

      const piece = position[r][c]; // This flips vertical access correctly
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
  else{
    
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
