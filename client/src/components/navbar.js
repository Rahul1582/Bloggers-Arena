import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./../css/navbar.css";


export default function Header() {

  const [loggedin , setloggedin] = useState(false);


  useEffect((loggedin) => {
  
    if(localStorage.getItem("loggedin")==='true'){
      
      if(!loggedin){
        setloggedin(true);
      }

      else{

        if(loggedin){
          setloggedin(false);
        }
        
      }

    }
}, []);


   return (
    <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-lg font">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <img src="https://i.ibb.co/6XzzZb8/mylogo.png" width="100" height="100" class="d-inline-block align-left" alt="" loading="lazy"/>

    
    <ul className="navbar-nav mr-auto">
      <li className="navbar-item font">
      <Link to="/" className="nav-link">Home</Link>
      </li>   

      
      <li className="navbar-item font">
      <Link to="/details" className="nav-link">Details</Link>
      </li>  

      <li className="navbar-item font">
      <Link to="/newpost" className="nav-link">New Post</Link>  
      </li>

      <li className="navbar-item font">
      <Link to="/userposts" className="nav-link">Your Posts</Link>
      </li>          

      <li className="navbar-item font">
      <Link to="/allposts" className="nav-link">All Posts</Link>
      </li>  

      <li className="navbar-item font">
      <Link to="/searchuserposts" className="nav-link">Search Author Posts</Link>
      </li>  

      <li className="navbar-item font">
      <Link to="/sign-up" className="nav-link">Register</Link>
      </li>      


    {!loggedin   ? ( 
      
      <li className="navbar-item font">
      <Link to="/sign-in" className="nav-link">Login</Link>
      </li>

    ) : (

      <li className="navbar-item font">
      <Link to="/" className="nav-link" 
      onClick={() => {
      window.localStorage.removeItem("loggedin");
      window.localStorage.removeItem("usertoken");
      window.location = "/";
      }}> Logout</Link>
      </li>

    )}

    </ul>
    </div>
  </nav>
    );
  }

