import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [
        {
          title: 'React',
          url: 'https://facebook.github.io/react',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0
        },
        {
          title: 'Redux',
          url: 'https://github.com/reactjs/redux',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1
        }
      ],
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(buttonId) {
    const updatedList = this.state.list.filter((item) => item.objectID !== buttonId);
    this.setState({
      list: updatedList
    });
  }

  onSearchChange(evt) {
    this.setState({
      searchTerm: evt.target.value 
    });
  }

  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm} 
            onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table 
          list={list} 
          searchTerm={searchTerm} 
          onDismiss={this.onDismiss}/>
      </div>
    );
  }
}


export default App;
