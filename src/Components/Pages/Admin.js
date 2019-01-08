import React, {Component} from 'react';
import Header from '../Header/Header';
import './Admin.css';

export default class Admin extends Component {
  constructor() {
    super()

    this.state = {
      title: "Admin"
    }
  }
  render() {
    return(
      <div>
        <Header title={this.state.title}/>
        <div className="a">Admin</div>
        </div>
    )
  }
}