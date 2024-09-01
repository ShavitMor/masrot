import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Custom styles for the navbar

const NavbarComponent = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Expense Tracker</Link>
      </div>
      <ul className="navbar-links">
        {/* <li><Link to="/">Home</Link></li>
        <li><Link to="/expenses">Expenses</Link></li> */}
      </ul>
    </nav>
  );
};

export default NavbarComponent;
