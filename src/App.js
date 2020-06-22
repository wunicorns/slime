import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

// import logo from './logo.svg';
import './App.css';
import Flow from './Pages/Flow';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/flow" component={Flow} />
        <Route path="/" component={Home} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
