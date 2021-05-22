import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../navbar';
import Container from '@material-ui/core/Container';
import "./../../css/createpost.css";

export default function Createposts() 
{
return(

    
  <div>
       <Header />

      <Container>

    <br></br><br></br>

    <div className="jumbotron">
      <h1 className="display-3">Welcome!</h1>
      <p>This is a MERN stack based fully functioning blog system. Here, you can share your experience and ideas with other people.</p>
      <p><Link className="btn btn-primary btn-lg" to="/allposts" role="button">Look the blog posts &raquo;</Link></p>
    </div>

    { /*Example row of columns*/ }
    <div className="row">
      <div className="col-md-4">
        <h2>FRONTEND</h2>
        <p>The front-end client is built as a simple-page-application using React. Besides, React-Router is used for navigation. Bootstrap 4 is used for page styling.</p>
      </div>
      <div className="col-md-4">
        <h2>BACKEND</h2>
        <p>The back-end server is built with Express.js and Node.js, which provides completed REST APIs for data interaction. Passport.js is used as an authentication middleware in the sever. JSON Web Token (JWT) is used for signing in user and making authenticated requests.</p>
      </div>
      <div className="col-md-4">
        <h2>DATABASE</h2>
        <p>MongoDB is used as the Back-end Database, which include different data models/schemas (i.e., User, Post). Mongoose is used to access the MongoDB for CRUD actions (create, read, update and delete).</p>
      </div>
    </div>
    </Container>
  </div>

);
}