import React, {Component} from 'react';
import Header from '../../Header/Header';
import Definition from './Definition'; 
import Word from './Word';
import Strikes from './Strikes';
import {connect} from 'react-redux';
import {strikeUpdater} from '../../../dux/reducer'
import './GamePage.css';

 class GamePage extends Component {
constructor() {
  super()

  this.state = {
    title: "Game Page",
    letterChosen: [],
    lettersSubmitted: [],
    showDefinition: false,
    strikeNumber: 0
  }
 
  this.showDefinitionFunction = this.showDefinitionFunction.bind(this);
  
}

// componentDidMount() {
//   this.updateStrikeNumber()
// }

// updateStrikeNumber() {

//   this.setState({
//     strikeNumber: this.props.strikeNumber 
//   })
// }



showDefinitionFunction() {
  // window.confirm is a function with true false if press ok then true if press cancel then false and cancel
  if (window.confirm("Click to show definition of the word. WARNING will give you a strike!")) {this.setState ({
    showDefinition: true
  })

    let newStrikes = this.props.strikeNumber + 1
        this.props.strikeUpdater(newStrikes)
        alert("Strike " + this.props.strikeNumber)
} else {}
  
}



render() {
  let boom = "https://cdn-images.threadless.com/threadless-media/artist_shops/shops/Chadi/products/709605/shirt-1534223623-4f7aaa77506cfc338662dbee2df21b2a.png?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbWyJ0cmltIiwgW2ZhbHNlLCBmYWxzZV0sIHt9XSwgWyJyZXNpemUiLCBbXSwgeyJ3aWR0aCI6IDk5Ni4wLCAiYWxsb3dfdXAiOiBmYWxzZSwgImhlaWdodCI6IDk5Ni4wfV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzEyMDAsIDEyMDBdLCB7ImJhY2tncm91bmQiOiAiZmZmZmZmIn1dLCBbInJlc2l6ZSIsIFs4MDBdLCB7fV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzgwMCwgODAwLCAiI2ZmZmZmZiJdLCB7fV0sIFsiZW5jb2RlIiwgWyJqcGciLCA4NV0sIHt9XV19"
 console.log('gp sn', this.state.strikeNumber)
  return (
    
    <div className="gamepage-parent">
      <div >
          <Header title={this.state.title}/>
        <div className="gp">
            { (this.props.strikeNumber === 5) ? (<div className="gameover">
              <div>GAME OVER </div>
              <img className="boom" src={boom} alt="game exploded"/>
              <div> Oops your word exploded </div>
              <div>
                <button className="reset-button" onClick={() => window.location.reload()} > New Word </button>
              </div>
            </div> ) : null }
          {(this.props.strikeNumber === 5) ? null : (<div >
        
            {this.state.showDefinition ? <Definition/> : null}
            {(!this.state.showDefinition || this.props.strikeNumber === 4)? <div><button  onClick={this.showDefinitionFunction}>Definiton</button> </div> : null /*if showdefinition is false show button*/ }
            <Word />
          
          </div>)
           }
          </div>
        </div>
          <div >
          { (this.props.strikeNumber === 5) ? null  : <Strikes className="strikes"/>}
          </div>
            
      </div>
    
    )
  }
}
 

function mapStateToProps(reducerState) {
  return {
    strikeNumber: reducerState.strikeNumber
  }
}

export default connect(mapStateToProps, {strikeUpdater}) (GamePage)