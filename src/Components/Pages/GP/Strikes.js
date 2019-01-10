import React, {Component} from 'react';
import GamePage from './GamePage';

export default class Strikes extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   add:0,
    //   strikeNumber: 0
    // }
    this.updateStrikeNumber = this.updateStrikeNumber.bind(this);
}

updateStrikeNumber() {
  let {strikeNumber} = this.state
  this.setState({
    strikeNumber: strikeNumber +1 
  })
}

render() {
  // let {strikeNumber} = this.state
  const checkmark = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Black_check.svg/240px-Black_check.svg.png",
  bigX = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Black_x.svg";
  const {add} = this.props
  let {strikeNumber} = this.props

  console.log('add: ', add)
    return(
      <div className="strikes-2">
      <div> {(strikeNumber >= 1 || add == 1) ? <img src={bigX} className="bigX" title="Strike 1!"/> : <img src={checkmark} className="checkmark" title="No Strikes yay!"/>}</div>
      <div> {(strikeNumber >= 2 || (strikeNumber >=1 && add == 1)) ? <img src={bigX} className="bigX" title="Strike 2!"/> : <img src={checkmark} className="checkmark" title="Strike 1!"/>}</div>
      <div> {(strikeNumber >= 3 || (strikeNumber >=2 && add == 1)) ? <img src={bigX} className="bigX" title="Strike 3!"/> : <img src={checkmark} className="checkmark" title="Strike 2!"/>}</div>
      <div> {(strikeNumber >= 4 || (strikeNumber >=3 && add == 1)) ? <img src={bigX} className="bigX" title="Strike 4!"/> : <img src={checkmark} className="checkmark" title="Strike 4!"/>}</div>
      <button onClick={this.updateStrikeNumber}>Strike</button>
      </div>
    )
  }
}