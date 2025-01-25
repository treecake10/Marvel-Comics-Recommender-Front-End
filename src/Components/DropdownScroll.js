import React, { useState } from "react";

const DropdownScroll = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
   
      <select id="dropdown-container" value={selectedValue} onChange={handleChange}>
        <option value="" disabled key="placeholder">
          Select a bookmarked series
      </option>
        {options.map((option) => (
          <option key={option.itemName} value={option.itemName}>
            {option.itemName}
          </option>
        ))}
      </select>
      
  );
};

export default DropdownScroll;
