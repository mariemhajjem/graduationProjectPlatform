import {React, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom"
import {Connect} from '../../services/LoginService'
import axios from "axios";
import jwt from 'jwt-decode'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.isa2m.rnu.tn">
        ISAMM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login() {
  let history = useHistory()
  const [error, setError] = useState("")
  const [student, setStudent] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  
  const { nom, prenom, email, password } = student;
  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  
  const submitStudentRecord = async (e) => {
     e.preventDefault();
    const res = await axios.post("http://localhost:5000/login/login", student); 
    console.log(res.status)
            if (res.status !== 200) {
                setError("Erreur")
                alert(error)
                console.log(res.status)
            } 
            const decoded = jwt(res.data.token);
            
            switch (decoded.role) {
              case "admin":
                localStorage.setItem("token", res.data.token);
                history.push("/admin/dashboard");
                break;
              case "user":
                localStorage.setItem("token", res.data.token);
                console.log(decoded.banned);
                if (decoded.banned) history.push("/Not-authorized");
                else
                  history.push({
                    pathname: "/student",
                    state: { detail: res.data.token },
                  });

                break;
              case "professor":
                localStorage.setItem("token", res.data.token);
                history.push({
                  pathname: "/professor",
                  state: { detail: res.data.token },
                });
                break;
              default:
                history.push("/Not-authorized");
            }
  };
    const classes = useStyles();
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={submitStudentRecord}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="nom"
                  value={nom}
                  onChange={(e) => onInputChange(e)}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Prenom"
                  name="prenom"
                  value={prenom}
                  onChange={(e) => onInputChange(e)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
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
                  onChange={(e) => onInputChange(e)}
                  label="Password"
                  type="password"
                  id="password"
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
              Sign in
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
}
