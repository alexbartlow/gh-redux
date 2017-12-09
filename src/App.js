import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {PageHeader} from 'react-bootstrap';
import './App.css';
import Store from './Store.js';
import Scenario from './Scenario.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: Store()
    };
  }
  
  render() {
    return (
      <Provider store={this.state.store}>
        <div className="container">
          <PageHeader>Gloomhaven Companion 2</PageHeader>
          <Scenario/>
        </div>
      </Provider>
    );
  }
}

export default App;
