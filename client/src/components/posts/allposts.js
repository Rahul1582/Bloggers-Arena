import React, {useState ,useEffect} from 'react';
import axios from "axios";
import './../../css/allposts.css';
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Allposts()
{

    const [articles, setarticles] = useState([]);
    const [loggedin , setloggedin] = useState(false);


    useEffect(() => {
       
        axios.get('posts/', {
            headers: {
                "x-access-token": localStorage.getItem("usertoken")
            }
          })
          .then((res) => {
            console.log(res.data.posts);
            setarticles(res.data.posts);
          })
          .catch((error) => {
            console.error(error)
          })

    }, []);
    
    useEffect(() => {
  
        if(localStorage.getItem("loggedin")=='true'){
          
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

    {
        if(loggedin){

            return ( 
        
                <div>
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
                                   <Container className="mt-4 viewPost">
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
                                            <Button
                                               className="mr-2"
                                               variant="outline-info"
                                               
                                            >
                                               Edit
                                            </Button>
                                            <Button variant="outline-danger" >
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
}