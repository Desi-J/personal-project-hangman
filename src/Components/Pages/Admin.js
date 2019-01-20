import React, {Component} from 'react';
import Header from '../Header/Header';
import './Admin.css';
import axios from 'axios';

export default class Admin extends Component {
  constructor() {
    super()

    this.state = {
      title: "Admin",
      adminList: []
    }
  }

  componentDidMount() {
    axios.get('/api/admin')
    .then((response) => {
      console.log('admin res:', response)
      this.setState({ adminList: response.data})
    })
  }
  render() {
    const {adminList} = this.state //CONSOLE.LOG STATE LATER CUZ ASYNCRONOUS
    console.log('adminlist', adminList)
    const List = adminList.map(item => {
      return (
        <div className="adminList" key={item.w_id}>
        
          <div className="user-email">user email: { item.email}</div>
          <div className="word-name">word: { item.name}</div>
          <div className="def">definition: { item.definition}</div>
          <div className="id" >word id: {item.w_id} </div>

        </div>
      )
    })


    return(
      <div>
        <Header title={this.state.title}/>
        <div className="a"></div>
        {List}
        </div>
    )
  }
}