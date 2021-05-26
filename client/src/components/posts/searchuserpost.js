import React, {useState ,useEffect} from 'react';
import axios from "axios";
import './../../css/searchuserpost.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container, Row, Col } from "react-bootstrap";
import formatteddate from "../../utils/formatteddate";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width:'100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    height:60,
    flex: 1,
    width: '100%',
  },
  iconButton: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(3),
    padding: 1,
  },
}));

export default function SearchUser() {
  const classes = useStyles();

  const [author, setauthor] = useState("");
  const [articles, setarticles] = useState([]);
  const [loggedin , setloggedin] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");



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


const onchangesearch = (e) =>{
    const author = e.target.value;
    setauthor(author);
}

const searchuserpost = (e) => {

   e.preventDefault();
   
    setMessage("");
    setSuccessful(false);

    axios.get('posts/author/'+author ,{ params: {
       author
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
            setarticles(res.data.posts);
            // window.location='/searchuserposts';
          }
        })
        .catch((error) => {

          setMessage("User Not Found");
          setSuccessful(false);
        })

  };

    if(loggedin){

        return (

        <Container>
        <br></br><br></br>
        <div className='back1'>
      <div className="articleback1">

      <h1>SEARCH USER POSTS BY TYPING THIER AUTHOR NAME</h1>
      <br></br>
    <Paper component="form" className={classes.root} onSubmit = {searchuserpost}>
      
      <InputBase
        className={classes.input}
        placeholder="Type Author Name"
        inputProps={{ 'aria-label': 'Search User Posts' }}
        onChange={onchangesearch}
      />
      <IconButton className={classes.iconButton} onClick = {searchuserpost}>
        <SearchIcon />
      </IconButton>

      
    </Paper>

    </div>
    </div>

   {(successful) ? (
   
   (articles.length===0) ? (

    <Container>
    <br></br><br></br><br></br>
    <div className="form-group">
               <div
                 className={ "alert alert-danger" }
                 role="alert"
               >
                This Particular Author have no Posts Till Now!! Try with Another One !
               </div>
             </div>
     </Container>
     ) :

   (

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
                                     <Col>Date: {formatteddate(article.date)}</Col>
                                  </Row>
                                
                                
                               </Container>
                                       
                              )
                              })
                                   
                      }
                       </div>
                      </ol>  
        </div>
   )):
   
   ( 
       <div></div>
   )              
}
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