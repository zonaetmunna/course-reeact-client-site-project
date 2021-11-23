import { Alert, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {
     const { user, error, isLoading, registerUser } = useAuth();
     const navigate = useNavigate();
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
          if (loginData.password !== loginData.password2) {
               alert('password dint match');

          }

          registerUser(loginData.name, loginData.email, loginData.password, navigate);

     }



     return (
          <Container>
               <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                         <Typography variant="h4">Register</Typography>
                         {isLoading && <CircularProgress />}
                         {!isLoading && <form onSubmit={handleSubmit}>
                              <TextField
                                   sx={{ width: "75%", m: 2 }}
                                   label="Name"
                                   name="name"
                                   onBlur={handleBlur}
                                   variant="filled"
                              />
                              <br />
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
                              <TextField
                                   sx={{ width: "75%", m: 2 }}
                                   label="Re-Password"
                                   name="password2"
                                   onBlur={handleBlur}
                                   variant="filled"
                              />
                              <br />
                              <Button sx={{ width: "75%", m: 2 }} type="submit" variant="contained">Register</Button>

                         </form>}
                         <Link to="/login">Are you have account ? please Login</Link>

                         {user.email && <Alert severity="success">Register successfully</Alert>
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

export default Register;