import React, { Component } from 'react';
import routes from './routes';
// import Header from './Components/Header/Header';
// import GamePage from './Components/Pages/GP/GamePage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       
       {routes}
       
      </div>
    );
  }
}

export default App;
