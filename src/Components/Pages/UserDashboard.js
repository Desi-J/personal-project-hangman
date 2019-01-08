import React, {Component} from 'react';
import Header from '../Header/Header'
import './UserDashboard.css';

export default class UserDashboard extends Component {
  constructor() {
    super()

    this.state = {
      title: "User Dashboard"
    }
  }
  render() {
    return(
      
      <div className="main">
        <Header title={this.state.title}/>
      <div className="udb">UserDashboard</div>
      
      </div>
    )
  }
}