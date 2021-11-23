import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MyOrder = () => {
     const { user, token } = useAuth();
     const [orders, setOrders] = useState([]);
     useEffect(() => {
          const url = `http://localhost:5000/orders?email=${user.email}`;
          fetch(url, {
               headers: {
                    'authorization': `Bearer ${token}`
               }
          })
               .then(res => res.json())
               .then(data => {
                    setOrders(data)
               })
     }, [])
     return (
          <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                         <TableRow>
                              <TableCell>userName</TableCell>
                              <TableCell align="right">Email</TableCell>
                              <TableCell align="right">ServiceName</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right">Action</TableCell>
                         </TableRow>
                    </TableHead>
                    <TableBody>
                         {orders.map((row) => (
                              <TableRow
                                   key={row._id}
                                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                   <TableCell component="th" scope="row">
                                        {row.userName}
                                   </TableCell>
                                   <TableCell align="right">{row.email}</TableCell>
                                   <TableCell align="right">{row.courseName}</TableCell>
                                   <TableCell align="right">{row.CoursePrice}</TableCell>
                                   <TableCell align="right">{row.protein}</TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </TableContainer>
     );
};

export default MyOrder;