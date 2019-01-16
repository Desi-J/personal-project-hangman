import React, {Component} from 'react';
import Header from '../Header/Header'
import './UserDashboard.css';
import axios from 'axios';
var unirest = require("unirest");

export default class UserDashboard extends Component {
  constructor() {
    super()

    this.state = {
      title: "User Dashboard",
      user: null,
      randomWord: ""

    }
  }

  getRandomWord() {
    unirest.get('https://wordsapiv1.p.mashape.com/words/?random=true')
      .header('X-Mashape-Key', 'e1e099fd5bmsh5d829bfad35ca03p19bb32jsn5139a618cb76')
    // axios.get('https://wordsapiv1.p.mashape.com/words/?random=true')
    .then(response => {
      this.setState({ randomWord: response})
    }).catch(error => {
      console.log('did not get the random word', error)
    })
  }

  

  render() {
    console.log('wordsAPI: ', this.state.randomWord)
    return(
      
      <div className="main">
        <Header title={this.state.title}/>
        <div className="udb">
          <div className="user_info">

            <form>hi</form>
          </div>

          <div className="user_words">

            <div className="word_card">
              <div className="w0rd"> Word </div>
              <div className="d3f"> Definition </div>
            </div>

          
          </div>

          <div className="createAWord" >Add A New Word
            <p1>Enter Word</p1>
            <div><input  className="wordName"/> <button onClick={this.getRandomWord}>Random</button></div>
            <p1>Enter Definition</p1>
            <textarea rows="7" cols="40" maxLength="140" className="word_def"/>
            <button className="button">Submit</button>
          </div>

      </div>
      </div>
    )
  }
}