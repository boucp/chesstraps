const game = new Chess();
const board = Chessboard('board', {
  draggable: false,
  position: 'start'
});

const pgn = `[Event "World Championship"]
[Site "Reykjavik"]
[Date "1972.07.11"]
[Round "6"]
[White "Bobby Fischer"]
[Black "Boris Spassky"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O
9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bc2 b4 15. Ne2 Re8
16. Ng3 Bf8 17. b3 exd4 18. Nxd4 d5 19. exd5 Rxe1+ 20. Qxe1 cxd5 21. Be3 g6
22. Qd2 Nc5 23. f3 Qb8 24. Bf4 Qd8 25. Be5 Nfd7 26. Bf4 Qb6 27. Kh1 Re8
28. Rd1 Ba6 29. Re1 Rxe1+ 30. Qxe1 Nd3 31. Bxd3 Qxd4 32. Bxa6 Qxf4 33. Ne2 Qe3
34. Qd1 Nc5 35. Bb5 Bd6 36. Qxd5 Be5 37. Bc4 Ne6 38. Qe4 Qc5 39. f4 Qf2 40. Qxe5
Bxe4 41. Nf6+ Kh8 42. Ng4 Qxg2# 0-1`;

game.load_pgn(pgn);

let history = game.history();
let currentMove = 0;

document.getElementById("nextBtn").onclick = () => {
  if (currentMove < history.length) {
    game.move(history[currentMove]);
    board.position(game.fen());
    currentMove++;
    updateMoveList();
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (currentMove > 0) {
    game.undo();
    currentMove--;
    board.position(game.fen());
    updateMoveList();
  }
};

function updateMoveList() {
  const moves = game.history({ verbose: true });
  let html = "";
  for (let i = 0; i < moves.length; i += 2) {
    const white = moves[i] ? moves[i].san : "";
    const black = moves[i + 1] ? moves[i + 1].san : "";
    html += `${Math.floor(i / 2) + 1}. ${white} ${black}<br>`;
  }
  document.getElementById("moveList").innerHTML = html;
}

updateMoveList();
