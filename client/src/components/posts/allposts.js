import React, {useState ,useEffect} from 'react';
import axios from "axios";
import './../../css/allposts.css';
import { Container, Row, Col} from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

export default function Allposts()
{

    const [articles, setarticles] = useState([]);
    const [loading,setloading] = useState(false);

    useEffect(()=> {
    
      setloading(true);
      setTimeout(()=> {
        setloading(false);
      },8000)
  
    }, [])
    

    useEffect(() => {
       
        axios.get('posts/allposts', )
          .then((res) => {
            console.log(res.data.posts);
            setarticles(res.data.posts);
          })
          .catch((error) => {
            console.error(error)
          })

    }, []);


         if(articles.length===0){
            return (

               <div>

              <br></br>
              {loading ? (<HashLoader color={"#11DDED"} loading={loading} css={override} size={100} />) 
            
            :(
               <Container>
               <br></br><br></br><br></br>
               <div className="form-group">
                          <div
                            className={ "alert alert-danger" }
                            role="alert"
                          >
                            No Posts are there Till Now!!.
                          </div>
                        </div>
           
               </Container>

            )
            }

      </div>
               );

         }

         else{

            return ( 
               <div>
                 <br></br>
              {loading ? (<HashLoader color={"#11DDED"} loading={loading} css={override} size={100} />) 
            
            :(

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
                                
                               </Container>
                                       
                              )
                              })
                                   
                      }
                       </div>
                      </ol>  
                      </div>
            )
            }
            </div>
         
          );
         }
     
        
}
