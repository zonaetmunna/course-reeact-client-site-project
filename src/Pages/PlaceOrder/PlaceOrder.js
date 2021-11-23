import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import OrderPlaced from './OrderPlaced';

const PlaceOrder = () => {
     const { id } = useParams();
     const [course, setCourse] = useState({});

     useEffect(() => {
          const url = `http://localhost:5000/courses/${id}`;
          fetch(url)
               .then(res => res.json())
               .then(data => setCourse(data));
     }, []);
     return (
          <div>
               <Container>
                    <Typography>{id}</Typography>
                    <Grid container spacing={2}>
                         <Grid item xs={12} sm={12} md={8}>

                              <Card sx={{ maxWidth: 345 }}>
                                   <CardActionArea>
                                        <CardMedia
                                             component="img"
                                             height="140"
                                             image={course.image}
                                             alt="green iguana"
                                        />
                                        <CardContent>
                                             <Typography gutterBottom variant="h5" component="div">
                                                  Lizard
                                             </Typography>
                                             <Typography variant="body2" color="text.secondary">
                                                  {course.description}
                                             </Typography>
                                             <Typography variant="body2" color="text.secondary">
                                                  {course.price}
                                             </Typography>
                                        </CardContent>
                                   </CardActionArea>

                              </Card>
                         </Grid>
                         <Grid item xs={12} sm={12} md={4}>
                              <OrderPlaced
                                   course={course}
                              ></OrderPlaced>
                         </Grid>
                    </Grid>
               </Container>

          </div>
     );
};

export default PlaceOrder;