export default function Square({ onSquareClick, otherClasses = "" }) {
  return (
    <button className={"square " + otherClasses} onClick={onSquareClick}>
    </button>
  );
}
