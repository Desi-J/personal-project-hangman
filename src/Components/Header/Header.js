import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser} from '../../dux/reducer';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import './Header.css'
import StripeCheckout from 'react-stripe-checkout';




class Header extends Component {
  constructor() {
    super()

    this.state = {
      
      user: null,
      amount: 500 // MUST SET AMMOUNT FOR THE STRIPE APP THINGY
    }
    this.logout = this.logout.bind(this)
    this.onToken = this.onToken.bind(this)
  }
  
  componentDidMount() {
    axios.get('/auth/user-data').then(response => {
      // console.log('response', response)
      this.setState({ user: response.data.user })
      this.props.setUser(response.data) //CALLS THAT REDUX FUNCTION TO SET THE USER
    }).catch(error => {
      console.log('compoenntDIDmount error did not get stuff', error)
    })
  }

  //A STRIPE FUNCTION THAT DOES A POST TO A STRIPE ACCOUNT
  onToken(token) {
    console.log(token)
    const {amount} = this.state
    axios.post('/stripe', {token,amount})
    .then(res => alert('payment sucessful')
    )
  }
  

  login() {
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }
  
  logout() {
   axios.post('/auth/logout')
   .then(this.props.history.push('/'))
   .then(window.location.reload())

   // this.props.history.push('/')
  }

  render() {
    const logo = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png";
    let {user,amount} = this.state
    let button;
    let pic = (user && user.picture)
    // Conditional rendering for the login/logout button
    if (this.state.user) {button = <button className="LogoutButton" onClick={this.logout}>Logout</button>}
    else { button = <button className="LoginButton" onClick={this.login}>Sign Up/Login</button>}
    
    //Conditional rendering for the page names
    const title = this.props.title
    console.log('KEYYY', process.env.REACT_APP_STRIPE_PKEY)
    return (
      <header className="Header">
        <div>
        <Link to="/" className="links">
        <img src={logo} alt="Logo" className="Logo" title="New Game"/>
        </Link>
          <div className="page_name">{title}</div>
        {/* <TakeMoney/> */}

          <div className="right">
          {(user) 
          ? <Link to="/userdashboard"  title="User Dashboard"><img src={pic} alt="user-image"className="user-pic"/></Link> 
          : null}
            
           <div className="login-out">{button}</div>
        <button className="donate">

          <StripeCheckout className="stripe"
            ComponentClass = "stripe"
            email = "test@test.com"
            amount ={amount}
            description=""
            token = {this.onToken}
            allowRememberMe={false}
            //PUBLISHABLE KEY
            stripeKey = {process.env.REACT_APP_STRIPE_PKEY} >Donate</StripeCheckout>

        </button>
          </div>
          
         
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps, {setUser}) (Header));