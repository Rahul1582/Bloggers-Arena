import React, {useState ,useEffect} from 'react';
import { Container} from "react-bootstrap";
import axios from 'axios';
import "./../../css/newpost.css";
import "bootstrap/dist/css/bootstrap.min.css";
// const Filter = require("bad-words"); 
// import { Editor } from "react-draft-wysiwyg";
// import { convertToRaw } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Newpost() 
{

  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [body, setbody] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loggedin , setloggedin] = useState(false);


  const onchangetitle = (e) => {
    const title = e.target.value;
    settitle(title);
  };

  const onchangeauthor = (e) => {
    const author = e.target.value;
    setauthor(author);
  };

  const onchangebody = (e) => {
    // const blocks = convertToRaw(e.getCurrentContent()).blocks;

    // const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

    // console.log(value);

    const body = e.target.value;

    setbody(body);
 
  };

  const handlepost = (e) => {

    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios.post('https://blog-posting-mern-deploy.herokuapp.com/posts/newpost',{
        title:title,
        body:body,
        author:author }, {
        headers: {
                "x-access-token": localStorage.getItem("usertoken")
            }
    }).then(function (res){
        console.log(res);
        const newmessage = res.data.message || res.data.flaws.title || res.data.flaws.body || res.data.flaws.author;
        setMessage(newmessage);
        const valid = res.data.isValid;

        if(valid && res.data.status===200){
          
          setSuccessful(true);

          window.location='/userposts';
        }


    }).catch(function (err){
      setMessage("Check your parameters. Post Addition Not Successful!!");
      setSuccessful(false);
    })

  }


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


  if(loggedin){


    return(
    

        <Container>
            <br></br><br></br>
            <h1>ADD A NEW POST</h1>
    
        <br></br>
      <div className='back'>
      <div className="articleback">
    
    <form onSubmit = {handlepost}>
      <div className="form-group"> 
        <label>AUTHOR :</label>
    
        <input  type="text"
            required
            className="form-control"
            name="author"
            label="Author"
            onChange={onchangeauthor}/>
    
        <label>TITLE :</label><input 
            type="text" 
            className="form-control"
            name="title"
            label="Title"
            onChange={onchangetitle}
            />
            <label>BODY CONTENT :</label>


        {/* <Editor
              editorState={body}
              toolbarClassName="report-editor"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onchangebody}
        /> */}

         <textarea 
          rows="10"
          cols="150"
          className="form-control"
          name="body"
          label="Body"
          onChange={onchangebody}/>
        
        <br></br>
        <input type="submit" value="POST" className="btn btn-success" />
      </div>
    
    
    
      {message && (
                <div className="form-group">
                  <div
                    className={ successful ? "alert alert-success": "alert alert-danger" }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
    
    </form>
    
    </div>
    </div>
    <br></br>
    <br></br>
    </Container>
    
    
    );

   }

  else{
    return (

    <Container>
    <br></br><br></br><br></br>
    <div className="form-group">
               <div
                 className={ "alert alert-danger" }
                 role="alert"
               >
                 You Need to Login to Access this Feature
               </div>
             </div>

    </Container>
    );
   }



}