import { useState } from "react";

//COMPLETE show winner
//COMPLETE cleare board
//TODO save wins
//TODO add color to clicked square
//TODO allow multiple boards
//TODO add a timer

// COMPLETE: For the current move only, show “You are at move #…” instead of a button.

// COMPLETE: Rewrite Board to use two loops to make the squares instead of hardcoding them.

// COMPLETE: Add a toggle button that lets you sort the moves in either ascending or descending order.

// COMPLETE: When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).

// TODO: Display the location for each move in the format (row, col) in the move history list.

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const displayOrder = isAscending ? "Ascending" : "Descending";
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); //FIXME go the way leetcode showed you to update the history array
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, index) => {
    let description = index > 0 ? "Go to move #" + index : "Go to game start";
    return (
      <li key={index}>
        {index === currentMove ? (
          "You are at move " + index
        ) : (
          <button onClick={() => jumpTo(index)}>{description}</button>
        )}
      </li>
    );
  });

  //TODO make the div not squish into each other, move buttons down
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div class="center">
          <button onClick={() => setIsAscending(!isAscending)}>
            {displayOrder}
          </button>
        </div>
        <ol>{isAscending ? moves : moves.slice().reverse()}</ol>
      </div>
    </div>
  );
}

function Square({ value, onSquareClick, otherClasses = "" }) {
  return (
    <button className={"square " + otherClasses} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // const [lines, setLines] = useState(calculateWinner(squares)); //should hold the cells that have won
  const lines = calculateWinner(squares)
  function handleClick(i) {
    if (squares[i] || lines.length > 0) {
      //square i is filled or game is won/draw
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    // setLines(calculateWinner(nextSquares));
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return [];
}
