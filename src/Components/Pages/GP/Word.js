import React, {Component} from 'react';
import GamePage from './GamePage';
 
export default class Word extends Component {
  constructor() {
    super()

    this.state = {
      word: "potato",
      dashedWord: "",
    }
  }

render() {
  let {word,dashedWord} = this.state
  let {letterChosen} = this.props
  let letters = new RegExp(letterChosen, "gi")
  let puzzleWord = word.replace(/[A-Z]/gi, '-')
  
  if(word.includes(letterChosen)) {
  // if letterChosen exists in word[i] replace the puzzleword(dashes) with the letter chosen
   const splitPuzzleWord = puzzleWord.split('')
   const splitWord = word.split('')
   for(let i=0; i<splitWord.length; i++) {
    if(splitWord[i] === letterChosen) {
      splitPuzzleWord[i] = letterChosen
    }
   }
    puzzleWord = splitPuzzleWord.join('')
    this.setState ({
      dashedWord: puzzleWord
    })
  }

  console.log( 'letterChosen:  ',letterChosen)
    return(
      <div>
        <div>{word.match(letters)}</div>
        <div>{dashedWord}</div>
      </div>
    )
  }
}