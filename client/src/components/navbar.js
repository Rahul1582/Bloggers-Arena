// import React from "react";
// import PropTypes from "prop-types";
// import { Navbar, Nav, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// // const onclick = (e) => {
// //   const password = e.target.value;
// //   setPassword(password);
// // };

// const Navigationbar =() => (
//    <Navbar
//       bg="dark"
//       variant="dark"
//       expand="sm"
//       className="mb-5"
//       style={{ minHeight: "5rem" }}
//    >
      
//          <Navbar.Brand>
            
//          </Navbar.Brand>
   
//       <Nav className="ml-auto">

//       <Link to="/">
//                <Button
//                   variant="outline-light"
//                   className="mr-sm-2"
                  
//                >
//                   Home
//                </Button>
//             </Link>
//        <Navbar.Brand>
            
//             </Navbar.Brand>
       
//       <Link to="/sign-up">
//                <Button
//                   variant="outline-light"
//                   className="mr-sm-2"
                  
//                >
//                   Register 
//                </Button>
//        </Link>
//        <Navbar.Brand>
            
//             </Navbar.Brand>

//             <Link to="/sign-in">
//                <Button
//                   variant="outline-light"
//                   className="mr-sm-2"
                 
//                >
//                  Login 
//                </Button>
//        </Link>

//             <Navbar.Brand>
            
//             </Navbar.Brand>

//             <Link to="/all-posts">
//                <Button
//                   variant="outline-light"
//                   className="mr-sm-2"
                  
//                >
//                   All Posts
//                </Button>
//             </Link>

//        <Navbar.Brand>
            
//             </Navbar.Brand>
       
//             <Link to="/">
//                <Button
//                   variant="outline-light"
//                   className="mr-sm-2"
//                >
//                   Logout
//                </Button>
//             </Link>
           
//       </Nav>
      
//    </Navbar>
// );

// Navigationbar.propTypes = {
//    auth: PropTypes.bool.isRequired,
//    onClick: PropTypes.func.isRequired
// };

// export default Navigationbar;



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./../css/navbar.css"

export default function Header() {


//   renderLinks() {
//     if (1) {      
//       return (
//         <div className="navbar-nav nav-item dropdown ml-auto">
//           <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.username}</a>
//           <div className="dropdown-menu" aria-labelledby="dropdown02">
//             <Link className="dropdown-item" to="/my_posts">Your Posts</Link>
//             <Link className="dropdown-item" to="/profile">Your Profile</Link>
//             <div className="dropdown-divider" />
//             <Link className="dropdown-item" to="/settings">Settings</Link>
//             <Link className="dropdown-item" to="/">Sign out</Link>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <ul className="navbar-nav">
//           <li className="nav-item" key={1}>
//             <Link className="btn btn-primary" to="/signup">Sign Up</Link>
//           </li>
//           <li className="nav-item" key={2}>
//             <Link className="btn btn-secondary ml-sm-2" to="/signin">Sign In</Link>
//           </li>
//         </ul>
//       );
//     }
//   }

{
   return (
    <nav className="navbar navbar-dark bg-dark sticky-top navbar-expand-lg font">
    <div className="collpase navbar-collapse">

    <img src="https://i.ibb.co/6XzzZb8/mylogo.png" width="100" height="100" class="d-inline-block align-left" alt="Navbar Image" loading="lazy"/>

    
    <ul className="navbar-nav mr-auto">
      <li className="navbar-item font">
      <Link to="/" className="nav-link">Home</Link>
      </li>          

      <li className="navbar-item font">
      <Link to="/allposts" className="nav-link">All Posts</Link>
      </li>        


      <li className="navbar-item font">
      <Link to="/sign-up" className="nav-link">Register</Link>
      </li>

      <li className="navbar-item font">
      <Link to="/sign-in" className="nav-link">Login</Link>
      </li>
     
    </ul>

   
    </div>
  </nav>
    );
  }
}
