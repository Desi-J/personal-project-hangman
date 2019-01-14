import React, {Component} from 'react';
import {connect} from 'react-redux';

 class Strikes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
      strikeNumber: 0
    }
    this.updateStrikeNumber = this.updateStrikeNumber.bind(this);
}
componentDidMount() {
  this.updateStrikeNumber()
}

updateStrikeNumber() {
  
  this.setState({
    strikeNumber: this.props.strikeNumber 
  })
}

render() {
  let {strikeNumber} = this.props
  const checkmark = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Black_check.svg/240px-Black_check.svg.png",
  bigX = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Black_x.svg";
  
  // let {strikeNumber} = this.state

  
    return(
      <div className="strikes-2">
      <div> {(strikeNumber >= 2) ? <img src={bigX}  alt="X" className="bigX" title="Strike 1!"/> : <img src={checkmark} alt="CM" className="checkmark" title="No Strikes yay!"/>}</div>
      <div> {(strikeNumber >= 3) ? <img src={bigX} className="bigX" alt="X" title="Strike 2!"/> : <img src={checkmark} alt="CM" className="checkmark" />}</div>
      <div> {(strikeNumber >= 4) ? <img src={bigX} className="bigX" alt="X" title="Strike 3!"/> : <img src={checkmark} alt="CM" className="checkmark" />}</div>
      <div> {(strikeNumber >= 5) ? <img src={bigX} className="bigX" alt="X" title="Strike 4!"/> : <img src={checkmark} alt="CM" className="checkmark" />}</div>
    
      </div>
    )
  }
}// GETS STRIKE NUMBER FRO REDUX STORE
function mapStateToProps(reducerState) {
  return {
    strikeNumber: reducerState.strikeNumber
  }
}

export default connect(mapStateToProps)(Strikes);