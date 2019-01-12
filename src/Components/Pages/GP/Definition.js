import React, {Component} from 'react';
import {connect} from 'react-redux';

import './GamePage.css';

class Definition extends Component {
 render() {
   return(
     <div className="word-def">Definition</div>
   )
 }
}

function mapStateToProps(reducerState) {
  return {
    strikeNumber: reducerState.strikeNumber
  }
}

export default connect(mapStateToProps)(Definition);