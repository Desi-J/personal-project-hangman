import React, {Component} from 'react';
import Header from '../Header/Header';
import './Admin.css';

export default class Admin extends Component {
  render() {
    return(
      <div>
        <Header/>
        <div className="a">Admin</div>
        </div>
    )
  }
}