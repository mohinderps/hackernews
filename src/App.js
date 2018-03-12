import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


class App extends Component {
  constructor(props){
    super(props);
    console.log('Constructor');
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
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

  setSearchTopStories(result) {
    console.log(this);
    this.setState({result});
  }

  render() {
    console.log('Render');
    const {searchTerm, result} = this.state;
    if(!result) {
      return null;
    }
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
          list={result} 
          searchTerm={searchTerm} 
          onDismiss={this.onDismiss}/>
      </div>
    );
  }

  componentDidMount(){
    console.log('componentDidMount');
    const {searchTerm} = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result.hits))
      .catch(error => error);
  }
}


export default App;
