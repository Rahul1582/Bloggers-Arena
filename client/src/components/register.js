import React , {useState} from 'react';
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
import './../css/register.css';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vname = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The name must be between 6 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 20 characters.
//       </div>
//     );
//   }
// };


export default function Register() {
  const classes = useStyles();
 
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");


  const onchangename = (e) => {
    const name = e.target.value;
    setname(name);
  };

  const onchangeemail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onchangepassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


  const handleRegister = (e) => {

    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    axios.post('auth/register',{
            name: name,
            email:email,
            password:password
        }).then(function (res){
            console.log(res);
            const newmessage = res.data.message || res.data.flaws.name || res.data.flaws.email || res.data.flaws.password;
            setMessage(newmessage);
            const valid = res.data.isValid;

            if(valid && res.data.status==200){
              setSuccessful(true);
              // window.location='/login';
            }
            
         
        }).catch(function (err){
          setMessage("Check your parameters. Registration not successful!!");
          setSuccessful(false);
           
        })
    
  };

  return (
 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          REGISTER
        </Typography>
        <form className={classes.form} onSubmit = {handleRegister}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                value={name}
                variant="outlined"
                required
                fullWidth
                label="Your Name"
                onChange={onchangename}
                autoFocus
              />
           </Grid>
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
            Register
          </Button> 
        
          <Grid item>
              <Link href="/sign-in  " variant="body2">
                Already have an account? Login
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