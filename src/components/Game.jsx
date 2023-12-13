import { useState } from "react";

import Board from "./Board";
import "../functions.js";

//COMPLETE show winner
//COMPLETE clear board
//COMPLETE save wins
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
  const [results, setResults] = useState({ X: 0, O: 0, D: 0 });
  const displayOrder = isAscending ? "Ascending" : "Descending";
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handleUpdateResults(squares) {
    const line = calculateWinner(squares);
    if (line.length > 0) {
      const winner = xIsNext ? "X" : "O";
      setResults((prevResults) => ({
        ...prevResults,
        [winner]: prevResults[winner] + 1,
      }));
    } else if (squares.every((square) => square !== null)) {
      // Check for a draw when all squares are filled and there's no winner
      setResults((prevResults) => ({
        ...prevResults,
        D: prevResults.D + 1,
      }));
    }
  }

  function handlePlay(nextSquares) {
    handleUpdateResults(nextSquares);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); //FIXME go the way leetcode showed you to update the history array
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
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
        <button className="reset" onClick={handleReset}>Reset</button>
        <div className="results">
          <p>
            <span className="p-2 mr-2 bg-primary text-white" id="x-span">
              X : {results.X}
            </span>
            <span className="p-2 mr-2 bg-success text-white" id="o-span">
              O : {results.O}
            </span>
            <span className="p-2 mr-2 bg-secondary text-white" id="d-span">
              D : {results.D}
            </span>
          </p>
        </div>
      </div>
      <div className="game-info">
        <div class="center">
          <button onClick={() => setIsAscending(!isAscending)}>
            {displayOrder}
          </button>
        </div>
        <div>
          <ol>{isAscending ? moves : moves.slice().reverse()}</ol>
        </div>
      </div>
    </div>
  );
}
