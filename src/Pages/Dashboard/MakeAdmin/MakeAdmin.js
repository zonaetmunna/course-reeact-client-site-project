import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const MakeAdmin = () => {
     const { token } = useAuth();
     const [email, setEmail] = useState('');
     const [success, setSuccess] = useState(false);

     const handleBlur = e => {
          setEmail(e.target.value);

     }
     const handleSubmit = e => {
          e.preventDefault();
          const user = { email };
          const url = 'http://localhost:5000/users/admin';
          fetch(url, {
               method: 'PUT',
               headers: {
                    'authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
               },
               body: JSON.stringify(user)
          })
               .then(res => res.json())
               .then(data => {
                    if (data.modifiedCount) {
                         alert('admin added');
                         setEmail('');
                         setSuccess(true);
                    };


                    console.log(data);
               })

     }


     return (
          <div>
               <form onSubmit={handleSubmit}>
                    <TextField
                         label="email"
                         variant="filled"
                         onBlur={handleBlur}
                    />
                    <Button variant="contained" type="submit">make admin</Button>
                    {success && <Alert severity="success">admin create successfully</Alert>
                    }

               </form>
          </div>
     );
};

export default MakeAdmin;