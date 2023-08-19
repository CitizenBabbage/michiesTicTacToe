import React, { useState, useRef, useEffect } from 'react';
import "./dropDown.css"

function DropdownMenu( props ) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuOptions = props.menuOptions; 
  const setFoe = props.setFoe; 
  const dropdownText = props.dropdownText; 

  function handleClickOutside (event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown
    }
  };

  function handleOptionClick(value) {
    setIsOpen(false);  // Close the dropdown
    setFoe(value);  // 
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>{dropdownText}</button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
          {menuOptions.map((item, index) => (
                    <li key={index} onClick={() => handleOptionClick(item.toLowerCase())}> {item} </li> 
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;