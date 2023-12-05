import React, { useState } from 'react';
import './signup.css'; 

const GetData = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
        console.log("going here");
      const response = await fetch('https://serverembd.azurewebsites.net/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
      setError('Your username has already been taken.');
        return;
      }

      // Sign-up successful, you can redirect or perform other actions
      setError('');
    } catch (error) {
        console.log("nope we here");
      setError('Your username has already been taken.');
    }
  };

  return { username, password, error, setUsername, setPassword, handleSignUp };
};

const Signup = () => {
  const { username, password, error, setUsername, setPassword, handleSignUp } = GetData();

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form>
        <div className="forms">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="forms">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Signup;

