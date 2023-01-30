import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = (e, index) => {
    const fromIndex = e.dataTransfer.getData("index");
    const newItems = [...items];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="App">
      <h1>Drag and Drop Array of Objects in React</h1>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <div
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDrop={(e) => onDrop(e, index)}
              onDragOver={onDragOver}
            >
              {item.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
