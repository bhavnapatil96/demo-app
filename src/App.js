import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from "./routes/index";

class App extends Component {
  render() {
    return (
          <div className="App-Content">
                <Routes/>
          </div>
    );
  }
}

export default App;
