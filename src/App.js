import React from 'react';
// import Cookies from 'js-cookie';
import Navbar from './components/Navbar'
import {BaseProvider, LightTheme} from 'baseui';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

// import { createStore } from 'redux'
import './App.css';
const engine = new Styletron();

function App() {
  


  return (
    <Router>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
          <Navbar 
          />
          </BaseProvider>
      </StyletronProvider>
      </Router>
  );
}

export default App;
