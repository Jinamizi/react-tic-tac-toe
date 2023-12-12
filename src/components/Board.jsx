import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  const lines = calculateWinner(squares);
  function handleClick(i) {
    if (squares[i] || lines.length > 0) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let status =
    lines.length === 0
      ? "Next player: " + (xIsNext ? "X" : "O") // Game is ongoing, determine next player
      : "Winner: " + (xIsNext ? "O" : "X"); // Game has a winner

  const boardRows = [];
  for (let i = 0; i < 3; i++) {
    const squaresInRow = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      squaresInRow.push(
        <Square
          key={index}
          otherClasses={lines.includes(index) ? "winning-square" : ""}
          onSquareClick={() => handleClick(index)}
          value={squares[index]}
        />
      );
    }
    boardRows.push(
      <div key={i} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  return (
    <div>
      <div className="status">{status}</div>
      {boardRows}
    </div>
  );
}
