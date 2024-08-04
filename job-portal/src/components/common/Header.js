import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/freelancer">Freelancer</Link></li>
          <li><Link to="/employer">Employer</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
