import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import logo from './logo.svg';
import Login from "./components/login";
import SignUp from "./components/register";
import Home from "./components/home";
import CreatePosts from "./components/posts/createpost";
import Newpost from "./components/posts/newpost";
import Allposts from "./components/posts/allposts";
import Header from './components/navbar';


function App() {
  return (
    
    <Router>
   <Header />
    <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path='/post' component = {CreatePosts} />
            <Route path='/newpost' component = {Newpost} />
            <Route path='/allposts' component = {Allposts}/>
           
          </Switch>
       
  
    </div>
    </Router>
  );
}

export default App;