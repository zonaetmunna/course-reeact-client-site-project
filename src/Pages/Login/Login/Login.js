import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
     const { user, error, isLoading, loginUser, signInWithGoogle } = useAuth();
     const navigate = useNavigate();
     const location = useLocation();


     // state for loginData
     const [loginData, setLoginData] = useState({});

     const handleBlur = e => {
          const field = e.target.name;
          const value = e.target.value;
          const newLoginData = { ...loginData };
          newLoginData[field] = value;
          console.log(newLoginData);
          setLoginData(newLoginData);

     }
     const handleSubmit = e => {
          e.preventDefault();
          loginUser(loginData.email, loginData.password, location, navigate)

     }

     const signInGoogle = () => {
          signInWithGoogle(location, navigate);
     }

     return (
          <Container>
               <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                         <Typography variant="h4">Logins</Typography>
                         {isLoading && <CircularProgress />}
                         {!isLoading && <form onSubmit={handleSubmit}>
                              <TextField
                                   sx={{ width: "75%", m: 2 }}
                                   label="email"
                                   name="email"
                                   onBlur={handleBlur}
                                   variant="filled"
                              />
                              <br />
                              <TextField
                                   sx={{ width: "75%", m: 2 }}
                                   label="password"
                                   name="password"
                                   onBlur={handleBlur}
                                   variant="filled"
                              />
                              <br />
                              <Button sx={{ width: "75%", m: 2 }} type="submit" variant="contained">Login</Button>

                         </form>}

                         <Button sx={{ width: "75%", m: 2 }} onClick={signInGoogle} type="submit" variant="contained">Google Sign in</Button>
                         <br />

                         <Link to="/register">Are you new ? please Register</Link>

                         {user.email && <Alert severity="success">Login successfully</Alert>
                         }
                         {error && <Alert severity="error">{error}</Alert>
                         }

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>

                    </Grid>
               </Grid>
          </Container>
     );
};

export default Login;