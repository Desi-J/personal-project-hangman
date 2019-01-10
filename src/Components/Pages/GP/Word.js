import React, {Component} from 'react';
import GamePage from './GamePage';
 
export default class Word extends Component {
  constructor() {
    super()
    this.state = {
      word: "potato",
      puzzleWord: "",
      letterChosen: "",
      lettersUsed: [],
      strikeNumber: 0
      
    }

    this.guessLetter = this.guessLetter.bind(this);
    this.updatePuzzleWord = this.updatePuzzleWord.bind(this);

  }


  componentWillMount() {
 this.setState({
   puzzleWord: this.state.word.replace(/[A-Z]/gi, '-')
 })
 console.log('-pw: ', this.state.puzzleWord)

  }
  
  guessLetter(e) {
  
    console.log('letter: ', e.target.value);
    this.setState({
      letterChosen: e.target.value
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
                this.setState({
                strikeNumber: strikeNumber +=1,
                })
                alert("Strike " + strikeNumber)
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
    word: this.state.puzzleInput,
    puzzleWord: this.state.puzzleInput.replace(/[A-Z]/gi, '-'),
    puzzleInput: ''
  })
}

render() {
  console.log('state', this.state);
  let {puzzleWord} = this.state;
 
    return(
      <div className="word">
        <div className="puzzleword">{puzzleWord}</div>
       
          <input title="Guess A Letter"  maxLength={1} onChange={this.guessLetter}/>
          <button className="enter-button" title="You Can Also Press Enter" onClick={() => this.updatePuzzleWord()}  >Try</button>
          <div><input type='text' value={this.state.puzzleInput} onChange={(e) => this.handleChange(e, 'puzzleInput')} placeholder='Enter puzzle word.'/><button onClick={this.submitWord}>Submit</button></div>
        
      </div>
    )
    }
  }