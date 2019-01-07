import React, {Component} from 'react';
import Header from '../Header/Header'
import './UserDashboard.css';

export default class UserDashboard extends Component {
  constructor() {
    super()

    this.state = {
      pageName: "UserDashboard"
    }
  }
  render() {
    return(
      
      <div className="main">
        <Header/>
      <div className="udb">UserDashboard</div>
      
      </div>
    )
  }
}