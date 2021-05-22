import React, { Component } from 'react';
//import { render } from 'react-dom';
// import {Helmet} from 'react-helmet'
import Container from '@material-ui/core/Container';
import axios from 'axios';
import "./../../css/newpost.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Newpost() 
{
return(

    <Container>

    <br></br><br></br>
  <div className='back'>
  <div className="articleback">
<title>YOUR ARTICLE</title>
<form>
  <div className="form-group"> 
    <label>Author: </label>
    <input  type="text"
        required
        className="form-control"
  
        />
    <label>title </label><input 
        type="text" 
        className="form-control"
        
        
        />
        <label>Artcile-content</label>
    <textarea 
      rows="10"
      cols="150"
      className="form-control"
        
        
        />
    <label>Date: </label>
    <br></br>
        <input type="submit" value="POST" className="btn btn-primary" />
  </div>
</form>

</div>
</div>

</Container>

);
}