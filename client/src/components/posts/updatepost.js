import React, {useState ,useEffect} from 'react';
import { Container} from "react-bootstrap";
import axios from 'axios';
import "./../../css/newpost.css";
import "bootstrap/dist/css/bootstrap.min.css";
// const Filter = require("bad-words"); 

export default function Updatepost(props) 
{

  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loggedin , setloggedin] = useState(false);

    const id = props.match.params.id;

    useEffect(() => {
 
    axios.get('https://blog-posting-mern-deploy.herokuapp.com/posts/post/' + id,{ params: {
       id
      }},
       {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-access-token',
            "x-access-token": localStorage.getItem("usertoken")
        }
      })
      .then((res) => {

          settitle(res.data.posts[0].title);
          setbody(res.data.posts[0].body);
        
      })
      .catch((error) => {
        console.error(error);
      })

  }, [id]);


  const onchangetitle = (e) => {
    const title = e.target.value;
    settitle(title);
  };


  const onchangebody = (e) => {
    const body = e.target.value;

    // if(body){

    // const filter1 = new Filter();

    // const filteredbody1 = filter1.clean(body);

    // setbody(filteredbody1);

    // }
    setbody(body);
 
  };

  const handleupdatepost = (e) => {

    e.preventDefault();

    setMessage("");
    setSuccessful(false);


    axios.post('https://blog-posting-mern-deploy.herokuapp.com/posts/update/' + id + "?" + id,
    {
      title:title,
      body:body,
  },
  {
  headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-access-token',
                "x-access-token": localStorage.getItem("usertoken"),
            }
    }).then((res) =>{
        console.log(res);

        const newmessage = res.data.message || res.data.flaws.title || res.data.flaws.body;
        setMessage(newmessage);
        const valid = res.data.isValid;


        if(valid && res.data.status===200){
          
          setSuccessful(true);
          window.location='/userposts';
        }


    }).catch((error) =>{
      console.log(error);
      setMessage("Check your parameters. Post Updation Not Successful!!");
      setSuccessful(false);
    })

  }
  

  useEffect(() => {
    
    if(localStorage.getItem("loggedin")==='true'){
    
      if(!loggedin){
        setloggedin(true);  
      }
    }

    if(localStorage.getItem("loggedin")==='false'){
     
      if(loggedin){
        setloggedin(false);
      }
     
    }

  }, [loggedin]);

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