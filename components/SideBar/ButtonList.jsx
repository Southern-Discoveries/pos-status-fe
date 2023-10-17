// ButtonList.js
import React from "react";

const ButtonList = ({ items, selectedItems, onItemClick }) => {
  // Ensure selectedItems is always an array
  selectedItems = selectedItems || [];

  return (
    <div>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onItemClick(item)}
          className={`w-full py-2 text-left rounded ${
            selectedItems.includes(item) ? "bg-blue-500 text-white" : "hover:bg-gray-300"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
