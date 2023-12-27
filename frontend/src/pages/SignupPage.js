import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { signup } from '../apis/signup';
import AuthContext from '../helpers/AuthContext';
import { setAuthHeader } from '../helpers/axios_helper';
import CloseIcon from '@mui/icons-material/Close';
import { hash } from '../helpers/HashGenerator';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Signup() {

  const navigate = useNavigate();


  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    re_password: ""
  });
  const [signupError, setErrorText] = React.useState({ error: false, errorText: "" });
  const authState = useContext(AuthContext).state;
  const setState = useContext(AuthContext).setState;

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validatePassword = () => {
    return form.password === form.re_password;
  }

  const validatePhoneNumber = () => {
    return form.phoneNumber.length === 10 && !isNaN(parseFloat(form.phoneNumber)) && isFinite(form.phoneNumber);
  }

  const validateEmail = () => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email);
  }

  const validateForm = () => {
    const flag = form.email !== "" &&
      form.firstName !== "" &&
      form.lastName !== "" &&
      form.phoneNumber !== "" &&
      form.password !== "" &&
      form.re_password !== "";
    return validateEmail() && validatePassword() && validatePhoneNumber() && flag;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: hash(form.password)
    };

    const res = await signup(user);
    if (res.success) {
      const userData = {
        isLoggedIn: true,
        data: res.data
      };
      setState(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setErrorText({ error: false, errorText: "" })
      setAuthHeader(res.data.token);
      navigate('/items');
    }
    else {
      setErrorText({ error: true, errorText: "Signup Error!" })
    }
  };


  return (
    <>
      {!authState.isLoggedIn ?
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
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      onChange={handleFormChange}
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleFormChange}
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleFormChange}
                      error={form.email !== "" && !validateEmail()}
                      helperText={((form.email !== "") && !validateEmail()) ? "Invalid Email!" : ""}
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="tel"
                      onChange={handleFormChange}
                      error={form.phoneNumber !== "" && !validatePhoneNumber()}
                      helperText={((form.phoneNumber !== "") && !validatePhoneNumber()) ? "Invalid Phone Number!" : ""}
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleFormChange}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleFormChange}
                      error={(form.password !== "") && !validatePassword()}
                      helperText={((form.password !== "") && !validatePassword()) ? "Password does not match!" : ""}
                      name="re_password"
                      label="Password"
                      type="password"
                      id="re_password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  disabled={!validateForm()}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                {
                  signupError.error ? <>
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                      <div style={{ backgroundColor: "#EF5350", borderRadius: 5, padding: 5, paddingRight: 10, display: "flex", alignItems: "center" }}>
                        <span style={{ flex: 1, marginLeft: 5 }}> {signupError.errorText}</span>
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
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link variant="body2" >
                      <NavLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Already have an account? Sign in
                      </NavLink>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider> :
        <>
          <div>
            Aready Logged In
          </div>
        </>
      }
    </>
  );
}