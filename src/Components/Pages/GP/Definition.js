import React, {Component} from 'react';
import {connect} from 'react-redux';

import './GamePage.css';

class Definition extends Component {
  constructor() {
    super()

    this.state = {
      definition: ""
    }
  }

  component
 render() {
   let def = this.props.wordObj
  //  console.log('wordObj: ', def)
   return(
     <div className="word-def">{def.definition}</div>
   )
 }
}

function mapStateToProps(reducerState) {
  return {
    strikeNumber: reducerState.strikeNumber,
    wordObj: reducerState.wordObj
  }
}

export default connect(mapStateToProps)(Definition);