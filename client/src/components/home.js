import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import img1 from "../asset-1.png";
import "./../css/home.css";
import Footer from "./footer";

export default function Home() {
  return (
    <div className="hero">
      <div className="container">
        <br></br>

        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-4">
            <h1 className="mb-3 display-2">BLOG POST APPLICATION</h1>
            <p>
              Write your own Blog !! Express your feelings!! Save Your Blogs !!
              Join with us! Login or Register.
            </p>
            <Link to="/sign-up">
              <Button variant="contained" color="primary">
                Register
              </Button>
            </Link>

            <br></br>
            <br></br>
            <Link to="/sign-in">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </div>

          <div className="col-lg-8">
            <br></br>
            <img src={img1} className="img-fluid" alt="img" />
          </div>
        </div>
      </div>

      <br></br>

      <Footer />
    </div>
  );
}
