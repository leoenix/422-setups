import React, { useState, useEffect } from 'react';
import './leaderboard.css'


const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('https://serverembd.azurewebsites.net/GetAll');
        if (!res.ok) {
            console.log("error communicating with server");
            }

        const data = await res.json();
          setData(data.sort((a,b) => b.points - a.points));
      } catch (err) {
        console.log('Error getting data' + err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, ranking) => (
            <tr key={user.username}>
              <td>{ranking + 1}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default Leaderboard;

