import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "./../../css/details.css";
import Footer from "../footer";

export default function Details() {

  return (
    <div>
      <Container>
        <br></br>
        <br></br>

        <div className="jumbotron">
          <h1 className="display-3">Welcome!</h1>
          <p>
            This is a MERN Stack based Fully Functioning Blog System. Here, you
            can share your experience and ideas with other people.
          </p>
          <p>
            <Link
              className="btn btn-primary btn-lg"
              to="/allposts"
              role="button"
            >
              Look the blog posts &raquo;
            </Link>
          </p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>FRONTEND</h2>
            <p>
              The Front-end Client is built using React JS. Besides, React-Router is used for navigation. Bootstrap 4
              is used for page styling.
            </p>
          </div>
          <div className="col-md-4">
            <h2>BACKEND</h2>
            <p>
              The Back-end Server is built with Express JS and Node JS, which
              provides completed REST APIs for data interaction. JSON Web Token
              (JWT) is used for signing in user and making authenticated
              requests.
            </p>
          </div>
          <div className="col-md-4">
            <h2>DATABASE</h2>
            <p>
              Mongo DB is used as the Back-end Database, which include different
              data models/schemas (i.e., User, Post). Mongoose is used to access
              the MongoDB for CRUD actions (Create, Read, Update and Delete).
            </p>
          </div>
        </div>
      </Container>

      <br></br>

      <Footer />
    </div>
  );
}
