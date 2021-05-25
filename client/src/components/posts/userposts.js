import React, {useState ,useEffect} from 'react';
import axios from "axios";
import './../../css/allposts.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Userposts()
{

    const [articles, setarticles] = useState([]);
    const [loggedin , setloggedin] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    // const [interval, setinterval] = useState("");
    // const [needupdate, setneedupdate] = useState(false);
    // const [updatearticles, setupdatearticles] = useState([]);


    useEffect(() => {

        // interval = setinterval(() => this.setState({ time: Date.now() }), 1000);
       
        axios.get('posts/', {
            headers: {
                "x-access-token": localStorage.getItem("usertoken")
            }
          })
          .then((res) => {
            // console.log(res.data.posts);
            setarticles(res.data.posts);
          })
          .catch((error) => {
            console.error(error)
          })

    }, []);
    
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
 

    const deletepost = (e) => {
   
      setMessage("");
      setSuccessful(false);
  
      axios.post('posts/delete/'+e ,{ params: {
         e
       }}
       ,{
            headers: {
               'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-access-token',
                "x-access-token": localStorage.getItem("usertoken")
            }    
          })
          .then((res) => {
            console.log(res);
           
            const newmessage = res.data.message
            setMessage(newmessage);

            if(res.data.status===200){
              
              setSuccessful(true);

              window.location='/userposts';
            }
          })
          .catch((error) => {

            setMessage("Deletion not successful!!");
            setSuccessful(false);
          })

    };

 
    if(loggedin){
     
         if(articles.length===0){

           
            return (

               <Container>
               <br></br><br></br><br></br>
               <div className="form-group">
                          <div
                            className={ "alert alert-danger" }
                            role="alert"
                          >
                            You have no Posts. Add New Posts to view the Posts.
                          </div>
                        </div>
           
               </Container>
               );

         }

         else{

            return ( 

               <div>

            
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
                      <ol>
                      <div className="grid-container mx-3">
                      {
                         
                          articles.map(article => {
                              return(
                                 
                                  // <div className="card" key={article.id}>
                                  //     <div className="card-body">
                                  //     <h5 className="card-title">{article.title}</h5>
                                  //     <h6 className="card-subtitle mb-2 text-muted">Author:{article.author}</h6>
                                  //     <h6 className="card-subtitle mb-2 text-muted">Date Posted:{article.date}</h6>
                                  //     <p className="card-text limit">{article.body}</p> </div>
                                  // </div> 
                                  <Container className="mt-4 viewPost" key={article._id}>
                                  <Row>
                                     <Col className="text-center postTitle">
                                        <h2>{article.title}</h2>
                                     </Col>
                                  </Row>
                                  <Row className="my-4" style={{ whiteSpace: "pre-wrap" }}>
                                     <Col>{article.body}</Col>
                                  </Row>
                                  <Row className="d-flex flex-column font-italic footerStyle">
                                     <Col>Created by : {article.author}</Col>
                                     <Col>Date: {article.date}</Col>
                                  </Row>
                                 
                                     <Row className="mt-4">
                                        <Col className="text-center">
                                        <Link
                                            to={`/updatepost/${article._id}/`}
                                           
                                        >
                                           <Button
                                              className="mr-2"
                                              variant="outline-info"
                                            // onClick = {() => updatepost([article._id,article.title,article.body,article.author,article.date])}  
                                           >
                                              Edit
                                           </Button>
                                           </Link>

                                           <Button variant="outline-danger" onClick={() => {if(window.confirm('Are you sure you want to Delete this Post?'))deletepost(article._id); }}>
                                              Delete
                                           </Button>
                                        </Col>
                                     </Row>           
                        </Container>
    
                              )
                              })
                                   
                      }

                       </div>
                      </ol>  

                      </div>

          );
         
         }
 
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
