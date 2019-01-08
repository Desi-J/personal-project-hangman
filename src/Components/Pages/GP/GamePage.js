import React, {Component} from 'react';
import Header from '../../Header/Header';
import Definition from './Definition'; 
import Word from './Word';
import './GamePage.css';

export default class GamePage extends Component {
constructor() {
  super()

  this.state = {
    title: "Game Page",
    letterChosen: "",
    letterSubmitted: '',
    showDefinition: false
  }
  this.guessLetter = this.guessLetter.bind(this);
  this.checkLetter = this.checkLetter.bind(this);
  this.showDefinitionFunction = this.showDefinitionFunction.bind(this);
}


guessLetter(e) {
  
  console.log('letter: ', e.target.value);
  this.setState({
    letterChosen: e.target.value
  })
}

checkLetter() {
  let {letterChosen} = this.state;
  console.log('checkLetter: ', letterChosen)
  console.log('lc: ', letterChosen)
// if letter chosen is length of 1 and matches any of the alphabet caps or naw
  if (letterChosen.match(/[a-z]/i)) { alert("ok!")}
  else {alert("Entry must be a single letter.")}
  this.setState({
    letterSubmitted: letterChosen
  })
}

showDefinitionFunction() {
  // window.confirm is a function with true false if press ok then true if press cancel then false and cancel
  if (window.confirm("Click to show definition of the word. WARNING will give you a strike!")) {this.setState ({
    showDefinition: true
  })} else {}
  
}



  render() {
    return (
      <div>
        <Header title={this.state.title}/>
        <div className="gp">
        <div>Game Page</div>
        <Word className="word" letterChosen={this.state.letterSubmitted}/>
         {this.state.showDefinition ? <Definition/> : null}
    {!this.state.showDefinition ? <div><button  onClick={this.showDefinitionFunction}>Definiton</button> </div> : null /*if showdefinition is false show button*/ }
        <div>
          <input title="Guess A Letter" maxLength='1' onChange={this.guessLetter}/>
          <button className="enter-button" title="You Can Also Press Enter" onClick={this.checkLetter}>Try</button>
        </div>
        </div>
      </div>
    )
  }
}