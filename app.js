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














// work with api
import React, { useState, useEffect } from "react";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://your-api.com/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = async (e, index) => {
    const fromIndex = e.dataTransfer.getData("index");
    const newItems = [...items];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    await fetch("https://your-api.com/items", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: newItems }),
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Real-Time Drag and Drop Array of Objects with API in React</h1>
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
};

export default App;
