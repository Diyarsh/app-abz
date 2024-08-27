import React from 'react';
import logo from '../assets/images/Logo.svg';
import './Header.scss';

const Header = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Section with ID ${id} not found`);
    }
  };

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="header">
      <img src={logo} alt="TESTTASK" className="logo" />
      <nav className="nav">
        <button 
          className="nav-button" 
          onClick={handleNavClick('users-section')}
        >
          Users
        </button>
        <button 
          className="nav-button" 
          onClick={handleNavClick('signup-section')}
        >
          Sign up
        </button>
      </nav>
    </header>
  );
};

export default Header;










