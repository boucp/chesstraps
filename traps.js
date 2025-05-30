
const openings = {
  "Italian Game": [
    {
      name: "Fried Liver Attack",
      pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3 Nb4 9. a3 Nxc2+ 10. Kd1 Nxa1"
    }
  ],
  "Philidor Defense": [
    {
      name: "Légal Trap",
      pgn: "1. e4 e5 2. Nf3 d6 3. Bc4 Bg4 4. Nc3 g6 5. Nxe5 Bxd1 6. Bxf7+ Ke7 7. Nd5#"
    }
  ]
};

const openingListDiv = document.getElementById('opening-list');
const trapListDiv = document.getElementById('trap-list');
const boardContainer = document.getElementById('board-container');
const trapTitle = document.getElementById('trap-title');
const moveList = document.getElementById('moveList');
let board, game, currentMoves, moveIndex;

function showOpenings() {
  openingListDiv.innerHTML = '';
  trapListDiv.innerHTML = '';
  boardContainer.style.display = 'none';
  for (const opening in openings) {
    const btn = document.createElement('button');
    btn.textContent = opening;
    btn.onclick = () => showTraps(opening);
    openingListDiv.appendChild(btn);
  }
}

function showTraps(opening) {
  trapListDiv.innerHTML = '';
  boardContainer.style.display = 'none';
  openings[opening].forEach(trap => {
    const btn = document.createElement('button');
    btn.textContent = trap.name;
    btn.onclick = () => playTrap(trap);
    trapListDiv.appendChild(btn);
  });
}

function playTrap(trap) {
  game = new Chess();
  game.load_pgn(trap.pgn);
  currentMoves = game.history();
  game.reset();
  moveIndex = 0;
  trapTitle.textContent = trap.name;
  board.position('start');
  updateMoveList();
  boardContainer.style.display = 'block';
}

function updateMoveList() {
  const moves = game.history({ verbose: true });
  let html = '';
  for (let i = 0; i < moves.length; i += 2) {
    const w = moves[i] ? moves[i].san : '';
    const b = moves[i + 1] ? moves[i + 1].san : '';
    html += `${Math.floor(i / 2) + 1}. ${w} ${b}<br>`;
  }
  moveList.innerHTML = html;
}

document.getElementById('nextBtn').onclick = () => {
  if (moveIndex < currentMoves.length) {
    game.move(currentMoves[moveIndex++]);
    board.position(game.fen());
    updateMoveList();
  }
};

document.getElementById('prevBtn').onclick = () => {
  if (moveIndex > 0) {
    game.undo();
    moveIndex--;
    board.position(game.fen());
    updateMoveList();
  }
};

window.onload = () => {
  board = Chessboard('board', 'start');
  showOpenings();
};
