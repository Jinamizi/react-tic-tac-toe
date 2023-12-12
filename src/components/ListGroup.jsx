export default function ListGroup({ items, heading }) {
  return (
    <div>
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={item} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
