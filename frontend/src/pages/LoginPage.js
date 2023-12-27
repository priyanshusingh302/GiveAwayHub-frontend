import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../apis/login';
import { setAuthHeader } from '../helpers/axios_helper';
import AuthContext from '../helpers/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate } from 'react-router-dom';
import { hash } from '../helpers/HashGenerator';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Chanchu Hathi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Login() {

  const navigate = useNavigate();

  const authState = useContext(AuthContext).state;
  const setState = useContext(AuthContext).setState;
  const [loginError, setErrorText] = React.useState({ error: false, errorText: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cred = {
      "email": data.get('email'),
      "password": hash(data.get('password')),
    };
    const res = await login(cred);
    if (res.success) {
      const userData = {
        isLoggedIn: true,
        data: res.data
      };
      setState(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setErrorText({ error: false, errorText: "" });
      setAuthHeader(res.data.token);
      navigate('/items');
    }
    else {
      setErrorText({ error: true, errorText: "Invalid Credentials" })
    }

  };

  return (
    <>
      {
        !authState.isLoggedIn ?
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link variant="body2">
                        <NavLink to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                          {"Don't have an account? Sign Up"}
                        </NavLink>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              {
                loginError.error ? <>
                  <div style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <div style={{ backgroundColor: "#EF5350", borderRadius: 5, padding: 5, paddingRight: 10, display: "flex", alignItems: "center" }}>
                      <span style={{ flex: 1, marginLeft: 5 }}>Invalid Credentials!</span>
                      <div
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#D32F2F")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#EF5350")}
                        onClick={() => (setErrorText({ error: false, errorText: "" }))}>
                        <CloseIcon style={{ verticalAlign: "middle" }} />
                      </div>
                    </div>
                  </div>
                </>
                  : null
              }
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider> : <>
            <div>
              Aready Logged In
            </div>
          </>
      }
    </>
  );
}