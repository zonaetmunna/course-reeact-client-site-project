import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const OrderPlaced = ({ course }) => {
     const { name, price, } = course;
     const { user } = useAuth();
     const [orderInfo, setOrderInfo] = useState('');

     const handleBlur = e => {
          const field = e.target.name;
          const value = e.target.value;
          const newOrderInfo = { ...orderInfo }
          newOrderInfo[field] = value;
          console.log(newOrderInfo);
          setOrderInfo(newOrderInfo);
     }

     const handleSubmit = e => {
          e.preventDefault();
          const orderData = {
               ...orderInfo
          }
          // save to database
          const url = 'http://localhost:5000/orders';
          fetch(url, {
               method: 'POST',
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(orderData)
          })
               .then(res => res.json())
               .then(data => {
                    if (data.insertedId) {
                         alert('order successfully');
                         setOrderInfo('')
                    }
               })

     }

     return (
          <Container>
               <form onSubmit={handleSubmit}>
                    <TextField
                         sx={{ m: 2 }}
                         id="filled-multiline-flexible"
                         name="userName"
                         value={user.displayName}
                         onBlur={handleBlur}
                         variant="filled"
                    />
                    <TextField
                         sx={{ m: 2 }}
                         id="filled-multiline-flexible"
                         name="email"
                         value={user.email}
                         onBlur={handleBlur}
                         variant="filled"
                    />
                    <TextField
                         sx={{ m: 2 }}
                         id="filled-multiline-flexible"
                         name="courseName"
                         value={name}
                         onBlur={handleBlur}
                         variant="filled"
                    />
                    <br />
                    <TextField
                         sx={{ m: 2 }}
                         id="filled-multiline-flexible"
                         name="CoursePrice"
                         value={price}
                         onBlur={handleBlur}
                         variant="filled"
                    />
                    <br />
                    <TextField
                         sx={{ m: 2 }}
                         id="filled-multiline-flexible"
                         label="quantity"
                         name="quantity"
                         onBlur={handleBlur}
                         variant="filled"
                    />
                    <br />
                    <Button sx={{ m: 2 }} type="submit" variant="contained">Order</Button>
               </form>

          </Container>
     );
};

export default OrderPlaced;