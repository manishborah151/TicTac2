// CPU tries to win or block

export function bestMove(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  // Try to win
  for (let [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    if (line.filter(x => x === 'O').length === 2 && line.includes(null)) {
      return [a, b, c][line.indexOf(null)];
    }
  }

  // Block player
  for (let [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    if (line.filter(x => x === 'X').length === 2 && line.includes(null)) {
      return [a, b, c][line.indexOf(null)];
    }
  }

  // Center
  if (!board[4]) return 4;

  // Corners
  for (let i of [0, 2, 6, 8]) {
    if (!board[i]) return i;
  }

  // Sides
  for (let i of [1, 3, 5, 7]) {
    if (!board[i]) return i;
  }

  return -1;
}
