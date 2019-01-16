import React, {Component} from 'react';
import {connect} from 'react-redux';
import {strikeUpdater} from '../../../dux/reducer'; //NOW WE HAVE ACESS TO FUNCTION IN HERE
import {wordUpdater} from '../../../dux/reducer';
import axios from 'axios';

export class Word extends Component {
  constructor() {
    super()
    this.state = {
      wordList: [],
      word: "",
      puzzleWord: "",
      letterChosen: "",
      lettersUsed: [],
      strikeNumber: 0
      
    }

    this.guessLetter = this.guessLetter.bind(this);
    this.updatePuzzleWord = this.updatePuzzleWord.bind(this);

  }

  componentDidMount(){
    console.log('did')
  }
  
  componentWillMount() {
    console.log('will ')
    this.fetchWords()
  
  }
  
  
  fetchWords = () => {
    axios.get('/api/words').then(response => {
      // console.log('words!!!!! ', response)
      let rand = response.data[Math.floor(Math.random()*response.data.length)]
      this.props.wordUpdater(rand)
      this.setState({ 
        word: rand.name,
        puzzleWord: rand.name.replace(/[A-Z]/gi, '-')
      })
      // console.log('rand', rand)



    })
  }
  
  guessLetter(e) {
  
    this.setState({
      letterChosen: e.target.value.toLowerCase()
    })
  }

  
  
  updatePuzzleWord(){
    let { word,letterChosen, lettersUsed, strikeNumber , puzzleWord} = this.state;
    
    // console.log('letterChosen: ', letterChosen)
    // if letter chosen is length of 1 and matches any of the alphabet caps or naw
    if (letterChosen.match(/[a-z]/i)) { 

      if(lettersUsed.join('').includes(letterChosen)) {
        alert("you have already used the letter " + letterChosen.toUpperCase())
      } else {
        let letterChosenArray = letterChosen.split('')  
        lettersUsed.push(letterChosenArray) 
        this.setState ({
          lettersUsed: lettersUsed
        }) 

    
      if(word.includes(letterChosen)) {
        // if letterChosen exists in word[i] replace the puzzleword(dashes) with the letter chosen
        const splitPuzzleWord = puzzleWord.split('')
        const splitWord = word.split('')
        for(let i=0; i<splitWord.length; i++) {
          if(splitWord[i] === letterChosen) {
            splitPuzzleWord[i] = letterChosen
          } else {}
        }
      
        this.setState ({
            puzzleWord: splitPuzzleWord.join(''),
            
          })
        }
        else { 
          if(!word.includes(letterChosen)) {
            // for(let i=0;i<lettersUsed.length;i++) {
              if(lettersUsed.join('').includes(letterChosen)) {
                // this.setState({
                // strikeNumber: strikeNumber +=1,
                // })
                let newStrikes = this.props.strikeNumber + 1
                this.props.strikeUpdater(newStrikes)
                alert("Strike " + this.props.strikeNumber)
              // }
            }
            
        } 
         
        }
        
          
        }
            }
            // this.setState({lettersSubmitted: this.state.lettersSubmitted.concat(list) }) /*idk exactly but allows you to keep adding to state without reseting it(array) */
      else {alert("Entry must be a single letter.")}
    }
    

handleChange = (e, key) => {
  this.setState({
    [key]: e.target.value
  })
}

submitWord = () => {
  
  this.setState({
    word: this.state.puzzleInput.toLowerCase(),
    puzzleWord: this.state.puzzleInput.replace(/[A-Z]/gi, '-'),
    puzzleInput: ''
  })
}

render() {
  let {puzzleWord} = this.state;
  // console.log('state', this.state)
 
    return(
      <div className="word">
        <div className="puzzleword">{puzzleWord}</div>
       
          <input placeholder="Guess A Letter"  maxLength={1} onChange={this.guessLetter}/>
          <button className="enter-button" title="You Can Also Press Enter" onClick={() => this.updatePuzzleWord()}  >Try</button>
          <div><input type='text' value={this.state.puzzleInput} onChange={(e) => this.handleChange(e, 'puzzleInput')} placeholder='Enter puzzle word.'/><button onClick={this.submitWord}>Submit</button></div>
        
      </div>
    )
    }
  }

  function mapStateToProps(state) {
    return {
      strikeNumber: state.strikeNumber,
      wordObj: state.wordObj
    }
  }
  
  export default connect(mapStateToProps, {strikeUpdater, wordUpdater}) (Word) 