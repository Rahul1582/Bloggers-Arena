import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onchangeemail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onchangepassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {

    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios.post('auth/login',{
            email:email,
            password:password
        }).then(function (res){
            console.log(res);
            const newmessage = res.data.message || res.data.flaws.name || res.data.flaws.email || res.data.flaws.password;
            setMessage(newmessage);
            const valid = res.data.isValid;

            if(valid && res.data.status==200){
              
              setSuccessful(true);
              localStorage.setItem('usertoken', res.data.token);
              localStorage.setItem('loggedin',true);

              window.location='/allposts';
            }


            // localStorage.setItem('user', res.config.data);
        }).catch(function (err){
          setMessage("Check your parameters. Login not successful!!");
          setSuccessful(false);  
        })

        
  
  };

  return (

    <Container component="main" maxWidth="xs">
          <br></br>
          <br></br>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          LOGIN
        </Typography>
        <br></br>
        <form className={classes.form} onSubmit = {handleLogin}>
        <Grid container spacing={3}>
        
          <Grid item xs={12}>
          <TextField
                variant="outlined"
                required
                fullWidth
                value={email}
                label="Email Address"
                name="email"
                onChange={onchangeemail}
                autoComplete="email"
            />
            </Grid>

            <Grid item xs={12}>
          <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                onChange={onchangepassword}
                label="Password"
                type="password"
                id=
                "password"
                autoComplete="current-password"
          />
          </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
         

          <Grid item>
              <Link href="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
              </Link>
            </Grid>

                <br>
                </br>
                    
                <Grid item > 
              <Link href="/" variant="body2">
               Home
              </Link>
            </Grid>
          
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
    </Container>

  );
}



// axios.get(`posts/` ,{headers : {
//   "x-access-token": localStorage.getItem("usertoken")
// }})