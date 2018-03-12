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
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onDismiss(id) {
    const updatedHits = this.state.result.hits.filter((item) => item.objectID !== id);
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    });
  }

  onSearchChange(evt) {
    this.setState({
      searchTerm: evt.target.value 
    });
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  render() {
    const {searchTerm, result} = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm} 
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        {result && <Table 
          list={result.hits} 
          onDismiss={this.onDismiss}/> }
      </div>
    );
  }

  componentDidMount(){
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
}


export default App;
