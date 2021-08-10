import React from 'react';
import logo from '../logo.png';

const Navigation = ({ state, onSignOut}) => {
  return(
    <nav style={{display: 'flex', justifyContent:'space-between', padding:'5px'}}>
      
      <img src={logo} className="App-logo grow pointer" alt="logo"/>
      {state === 'home' ?
      <p 
      onClick={() => onSignOut()}
      className="f3 link theme pr2 grow pointer"
      >
        Sign Out
      </p>
      :
      <div></div>
      }
    </nav>
  );
}

export default Navigation;