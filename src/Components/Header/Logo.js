import React, {Component} from 'react';
import Header from './Header';
import './Header.css';

export default class Logo extends Component {
render() {
  const logo = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png";
  return (
    <img src={logo} alt="Logo" />
  )

}
}