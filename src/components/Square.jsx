export default function Square({ value, onSquareClick, otherClasses = "" }) {
  return (
    <button className={"square " + otherClasses} onClick={onSquareClick}>
      {value}
    </button>
  );
}
