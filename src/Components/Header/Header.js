import React, {Component} from 'react';
import routes from '../../routes';
import {Link} from 'react-router-dom';
// import UserDashboard from '../Component/Pages/UserDashboard';
import './Header.css'

export default class Header extends Component {
  constructor() {
    super()

    this.state = {
      
      isLoggedIn: false

    }
  }
  render() {
    const logo = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png";
    let button;
// Conditional rendering for the login/logout button
    if (this.state.isLoggedIn) {button = <button className="LogoutButton">Logout</button>}
    else { button = <button className="LoginButton">Sign Up/Login</button>}

//Conditional rendering for the page names
    const title = this.props.title

    return (
      <header className="Header">
        <div>

        <Link to="/" className="links">
        <img src={logo} alt="Logo" className="Logo" title="New Game"/>
        </Link>
          <div className="page_name">{title}</div>
          <div>
           <Link to="/userdashboard" className="links" title="User Dashboard">User.image</Link> 
            {button}
          </div>
          
         
        </div>
      </header>
    )
  }
}