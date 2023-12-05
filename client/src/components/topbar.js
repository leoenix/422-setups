import React, { useState } from 'react';
import './bar.css'; 
import Signup from './Signup'
import Leaderboard from './Leaderboard'
const Topbar = () => {
  const [currentPage, setCurrentPage] = useState('leaderboard');

  return (
      <>
    <nav className="bar">
      <ul>
        <li
          className={currentPage === 'leaderboard' ? 'active' : ''}
          onClick={() => setCurrentPage('leaderboard')}
        >
          <a href = "#">Home</a>
        </li>
        <li
          className={currentPage === 'signup' ? 'active' : ''}
          onClick={() => setCurrentPage('signup')}
        >
          <a href="#signup">Sign Up</a>
        </li>
      </ul>
    </nav>

          {currentPage === 'signup' && (
              <Signup />
          )}
    {currentPage === 'leaderboard' && (
             <Leaderboard />
            
    )} 
      </>
  );
};


export default Topbar;

