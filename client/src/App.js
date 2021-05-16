import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import Login from "./components/login";
import SignUp from "./components/register";
import Home from "./components/home";
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Router>
     
    <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        
    </div>
    </Router>
  );
}

export default App;