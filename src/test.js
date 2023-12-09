function Board() {
    // Assuming squares and handleClick are defined elsewhere
  
    const boardRows = [];
    for (let i = 0; i < 3; i++) {
      const squaresInRow = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        squaresInRow.push(
          <Square key={index} onSquareClick={() => handleClick(index)} value={squares[index]} />
        );
      }
      boardRows.push(<div key={i} className="board-row">{squaresInRow}</div>);
    }
  
    return <div>{boardRows}</div>;
  }
  