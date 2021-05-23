import React, {useState ,useEffect} from 'react';
import { Container} from "react-bootstrap";
import axios from 'axios';
import "./../../css/newpost.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Updatepost(props) 
{

  const [id, setid] = useState("");
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [body, setbody] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loggedin , setloggedin] = useState(false);

//   const { article_id , title, body , author , date } = props.data;
  console.log(props.data);

  console.log("rahul");
  setid(props.data[0]);
  settitle(props.data[1]);
  setbody(props.data[2]);
  setauthor(props.data[3]);

 

  const onchangetitle = (e) => {
    const title = e.target.value;
    settitle(title);
  };

  const onchangeauthor = (e) => {
    const author = e.target.value;
    setauthor(author);
  };

  const onchangebody = (e) => {
    const body = e.target.value;
    setbody(body);
  };

  const handleupdatepost = (e) => {

    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios.post('posts/update' + id ,{ params: {
        id
      }},
      {
        title:title,
        body:body,
        author:author 
    }, {
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-access-token',
                "x-access-token": localStorage.getItem("usertoken")
            }
    }).then(function (res){
        console.log(res);
        const newmessage = res.data.message || res.data.flaws.title || res.data.flaws.body || res.data.flaws.author;
        setMessage(newmessage);
        const valid = res.data.isValid;

        if(valid && res.data.status===200){
          
          setSuccessful(true);

          window.location='/allposts';
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
            <h1>UPDATE AN EXISTING POST</h1>
    
        <br></br>
      <div className='back'>
      <div className="articleback">
    
    <form onSubmit = {handleupdatepost}>
      <div className="form-group"> 
        <label>AUTHOR :</label>
    
        <input  type="text"
            required
            className="form-control"
            name="author"
            label="Author"
            onChange={onchangeauthor}
            value = {author}/>
    
        <label>TITLE :</label><input 
            type="text" 
            className="form-control"
            name="title"
            label="Title"
            onChange={onchangetitle}
            value = {title}
            />
            <label>BODY CONTENT :</label>
        <textarea 
          rows="10"
          cols="150"
          className="form-control"
          name="body"
          label="Body"
          onChange={onchangebody}
          value = {body}/>
        
        <br></br>
        <input type="submit" value="UPDATE" className="btn btn-success" />
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