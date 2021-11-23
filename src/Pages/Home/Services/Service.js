import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { useNavigate } from 'react-router';

const Service = ({ course }) => {
     const { _id, name, image, description, price } = course;
     const navigate = useNavigate();

     // handleGoOrder
     const handleGoOrder = () => {
          const url = `/placeOrder/${_id}`
          navigate(url);
     }

     return (
          <Grid item xs={2} sm={4} md={4} >
               <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                         <CardMedia
                              component="img"
                              height="140"
                              image={image}
                              alt="green iguana"
                         />
                         <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                   {name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                   {description}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                   {price}
                              </Typography>
                         </CardContent>
                    </CardActionArea>
                    <CardActions>
                         <Button onClick={handleGoOrder} color="primary">
                              More
                         </Button>
                    </CardActions>
               </Card>
          </Grid>
     );
};

export default Service;