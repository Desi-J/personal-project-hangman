import React, {Component} from 'react';
import Header from '../../Header/Header';
import Definition from './Definition'; 
import Word from './Word';
import Strikes from './Strikes';
import './GamePage.css';

export default class GamePage extends Component {
constructor() {
  super()

  this.state = {
    title: "Game Page",
    letterChosen: [],
    lettersSubmitted: [],
    showDefinition: false
  }
 
  this.showDefinitionFunction = this.showDefinitionFunction.bind(this);
  
}






showDefinitionFunction() {
  // window.confirm is a function with true false if press ok then true if press cancel then false and cancel
  if (window.confirm("Click to show definition of the word. WARNING will give you a strike!")) {this.setState ({
    showDefinition: true
  })} else {}
  
}



render() {
  let {lettersSubmitted} = this.state
  // console.log('lettersSubmitted:', lettersSubmitted)
 
  return (
    
    <div className="gamepage-parent">
      <div >
          <Header title={this.state.title}/>
        <div className="gp">
          <div >Game Page
          
            {this.state.showDefinition ? <Definition/> : null}
            {!this.state.showDefinition ? <div><button  onClick={this.showDefinitionFunction}>Definiton</button> </div> : null /*if showdefinition is false show button*/ }
            <Word />
          
          </div>
          </div>
        </div>
          <div >
          { (this.state.showDefinition) ? <Strikes className="strikes" add={1} /> : <Strikes className="strikes" add={0}/>}
          </div>
      
      </div>
    
    )
  }
}