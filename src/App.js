import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import CodeBlockPage from './components/CodeBlockPage/CodeBlockPage';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        codeblocksArr: [],
      };
    }

    componentDidMount() {
      this.fetchCodeBlocks();
    }

    fetchCodeBlocks() {
      fetch('https://codingonline.onrender.com')
      .then(response => response.json())
      .then(codeblocks => {
        this.setState({ codeblocksArr: codeblocks });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    render() {
      return (
          <Router>
            <Routes>
                  <Route
                      exact
                      path="/codeblocks"
                      element={<HomePage codeblocks={this.state.codeblocksArr}/>}
                  />
                  <Route
                      exact
                      path="codeblocks/:id"
                      element={<CodeBlockPage codeblocks={this.state.codeblocksArr}/>}
                  />  
            </Routes>
          </Router>
      );    
  }
}

export default App;
