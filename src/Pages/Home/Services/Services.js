import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Service from './Service';




const Services = () => {

     const [courses, setCourses] = useState([]);
     useEffect(() => {
          const url = 'http://localhost:5000/courses';
          fetch(url)
               .then(res => res.json())
               .then(data => setCourses(data));
     }, [])

     return (
          <Container>
               <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                         {
                              courses.slice(0, 6).map(course => <Service
                                   course={course}
                              ></Service>)
                         }
                    </Grid>
               </Box>
          </Container>
     );
};

export default Services;