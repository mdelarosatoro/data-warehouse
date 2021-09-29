import React from 'react';
import './App.css';
import Login from './Login';
import Main from './Main';
import Navbar from './Navbar';

function App() {
  const auth = true;

  return (
    <div className="App">
      <div className="AppBody">
        {!auth ? <Login /> :
        (
          <>
            <Navbar />
            <Main />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
