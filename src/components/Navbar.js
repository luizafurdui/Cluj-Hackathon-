import React, { useState } from 'react';
import './Navbar.css';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <div className={isOpen ? "nav-links active" : "nav-links"}>
        {props.children}
      </div>
    </div>
  );
}

export default Navbar;
