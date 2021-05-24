import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import logo from './logo.svg';
import Login from "./components/login";
import SignUp from "./components/register";
import Home from "./components/home";
import Header from "./components/navbar";
import Details from "./components/posts/details";
import Newpost from "./components/posts/newpost";
import Allposts from "./components/posts/allposts";
import SearchUser from './components/posts/searchuserpost';
import Userposts  from './components/posts/userposts';
import Updatepost from "./components/posts/updatepost";

function App() {
  return (
    
    <Router>
   <Header />
    <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path='/details' component = {Details} />
            <Route path='/newpost' component = {Newpost} />
            <Route path='/userposts' component = {Userposts} />
            <Route path='/allposts' component = {Allposts}/>
            <Route path='/searchuserposts' component = {SearchUser}/>
            <Route path='/updatepost/:id/' component = {Updatepost}/>
          </Switch>
    </div>
    </Router>
  );
}

export default App;