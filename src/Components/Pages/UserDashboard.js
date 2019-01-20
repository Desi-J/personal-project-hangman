import React, {Component} from 'react';
import Header from '../Header/Header'
import './UserDashboard.css';
import axios from 'axios';
import {connect} from 'react-redux';


class UserDashboard extends Component {
  constructor() {
    super()
    
    this.state = {
      title: "User Dashboard",
      user: null,
      word: "",
      definition: "",
      wordList: []

    }
    this.changeHandler = this.changeHandler.bind(this)
    this.getUserWords = this.getUserWords.bind(this);
    this.submitWord = this.submitWord.bind(this);
    this.updateWord = this.updateWord.bind(this);
    this.getUser = this.getUser.bind(this);
  }

componentDidMount() {
  this.getUserWords()
  this.getUserWords()
}
// allows you to set state with multiple infputs with 1 function 
  changeHandler(event){
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
    })

  }

getUser() {
  this.setState({
    user: this.props.user
  })
}

getUserWords() {
  axios.get(`/api/words`).then((response) => {
    console.log('uerWordsResponse', response.data)
    this.setState({ wordList: response.data})
  }).catch(error => {
    console.log('readUSERwords error frontend: ', error)
  })
}

submitWord(addedWord,addedDefinition) {
  axios.post(`/api/words`, {
    name: addedWord,
    definition: addedDefinition}) //req.body
    .then((response) => {
      console.log('word updated', response)
      this.setState({ wordList: response.data})
      // window.location.reload()
    })
    .catch(error => {
      console.log('submit word error frontend: ', error)
    })

}

updateWord(id) {
  console.log('update id:', id)
  const newWord = {
    name: this.state.word,
    definition: this.state.definition
  } 
  axios.put(`/api/words/${id}`, newWord) //THE 2ND AXIOS PARAM IS THE BODY so like req.body.whatever
  .then((response) => {
    console.log('update res: ', response)
    this.setState({ wordList: response.data})
  }).catch(error => {
    console.log('update error frontend:', error)
  });
}

deleteWord(id) {
  console.log('delete id: ', id)
  axios.delete(`/api/words/${id}`)
  .then((response) => {
    console.log('res', response)
    this.setState({ wordList: response.data})
    // window.location.reload()
  });
}
    

  
render() {
  console.log('dashSTATE', this.state)
  let {wordList} = this.state;
  let {user} = this.props
  let pic = (user && user.user.picture)
  let email = (user && user.user.email)
  console.log("user", user)
  const userWordCards = wordList.map(word => {
    return (
    <div className="word_card" key={word.w_id}> 
        
              <div className="w0rd">{word.name}</div>
              <div className="d3f">{word.definition}</div>

              <div className="ud">  
                <button className="deleteButton" onClick={() => this.deleteWord(word.w_id)} >Delete</button>
                <button onClick={() => this.updateWord(word.w_id)}>Update</button>
              </div>

            </div>
    )
  })
    return(
      
      <div className="main">
        <Header title={this.state.title}/>
        <div className="udb">
          <div className="user_info">

            <form>Hi</form>
            <div className="pik"> <img className="pix" src={pic} alt="pic"/> </div>
            <div className="email">{email}</div>
          </div>

          <div className="user_words">

           <div>{userWordCards}</div>

          
          </div>

          <div className="createAWord" >Add A New Word

            <div>Enter Word</div>
            <div><input  name="word" className="wordName" maxLength="12" onChange={this.changeHandler}/> </div>
            <div>Enter A Hint</div>
            <textarea name="definition" maxLength="140" className="word_def" onChange={this.changeHandler}/>
            <button className="button" onClick={() => this.submitWord(this.state.word, this.state.definition)}  >Submit</button>
            <div>Add a new word to the game. So that other players will be able to try and guess it.</div>

          </div>

      </div>
      </div>
    )
  }
}

//GETS USER FROM REDUX STORE
function mapStateToProps(reducerState) {
  return {
    user: reducerState.user
  }
}

export default connect(mapStateToProps)(UserDashboard);