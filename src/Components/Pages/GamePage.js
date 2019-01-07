import React, {Component} from 'react';
import Header from '../Header/Header'
import './GamePage.css';

export default class GamePage extends Component {

  render() {
    return (
      <div>
        <Header/>
        <div className="gp">Game Page</div>
      
      </div>
    )
  }
}