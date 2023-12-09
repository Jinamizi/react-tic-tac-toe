import { useState } from "react";

//TODO show winner
//TODO cleare board
//TODO save wins
//TODO add color to clicked square
//TODO allow multiple boards
//TODO add a timer

// TODO: For the current move only, show “You are at move #…” instead of a button.

// TODO: Rewrite Board to use two loops to make the squares instead of hardcoding them.

// TODO: Add a toggle button that lets you sort the moves in either ascending or descending order.

// TODO: When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).

// TODO: Display the location for each move in the format (row, col) in the move history list.


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory) //FIXME go the way leetcode showed you to update the history array
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  const moves = history.map((square, move) => {
    let description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return <li key={move}><button onClick={() => jumpTo(move)}>{description}</button></li>
  })

  //TODO make the div not squish into each other, move buttons down
  return ( 
  <div className="game">
    <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  </div>
  )
}

function Square({value, onSquareClick}) {
  
  
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({xIsNext, squares, onPlay}) {
function handleClick (i) {
  if (squares[i] || calculateWinner(squares)) {
    return;
  }
  
  const nextSquares = squares.slice()
  nextSquares[i] = xIsNext ? "X" : "O"
  onPlay(nextSquares)
}

const winner = calculateWinner(squares)
let status = winner ? "Winner: " + winner :  "Next player: " + (xIsNext ? "X" : "O")

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(0)} value={squares[0]}/>
        <Square onSquareClick={() => handleClick(1)} value={squares[1]}/>
        <Square onSquareClick={() => handleClick(2)} value={squares[2]}/>
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(3)} value={squares[3]}/>
        <Square onSquareClick={() => handleClick(4)} value={squares[4]}/>
        <Square onSquareClick={() => handleClick(5)} value={squares[5]}/>
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(6)} value={squares[6]}/>
        <Square onSquareClick={() => handleClick(7)} value={squares[7]}/>
        <Square onSquareClick={() => handleClick(8)} value={squares[8]}/>
      </div>
    </>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
