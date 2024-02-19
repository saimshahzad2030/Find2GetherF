// import React, { useState } from 'react'
// import { Formik, Form} from 'formik';
// import { TextField,Button } from '@mui/material'
// import style from './ContactUs.module.css'
// export default function ContactUs() {
    
//  function validateEmail(value) {
//     let error;
//     if (!value) {
//       error = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//       error = 'Invalid email address';
//     }
//     return error;
//   }
  
//   function validateUsername(value) {
//     let error;
//     if (value === 'admin') {
//       error = 'Nice try!';
//     }
//     return error;
//   }
//   const [username,setUsername] = useState('');
//   const [email,setEmail] = useState('');
//   return (
//       <div className={style.mainDiv}>
//       <h1>Contact us</h1>
//       <Formik
//        initialValues={{
//          username: username,
//          email: email,
//        }}
//        onSubmit={values => {
//          // same shape as initial values
//          console.log(values);
//        }}
//      >
//        {({ errors, touched, isValidating }) => (
//          <Form>
//            <TextField id="outlined-basic" 
//       label="Email" 
//       variant="outlined"
//      className={style.emailField}
//      onChange={(e)=>{setEmail(e.target.value)}}
//      sx={{
//         width: '60%',
//         marginTop: '20px',
//      }} />
//       {errors.email && touched.email && <div>{errors.email}</div>}
//       <TextField id="outlined-basic" 
//       label="Name" 
//       variant="outlined"
//      className={style.nameField} 
     
//      onChange={(e)=>{setUsername(e.target.value)}}
//      sx={{
//         width: '60%',
//         marginTop: '20px',
//      }} />
//       {errors.username && touched.username && <div>{errors.username}</div>}
//       <TextField
//            id="outlined-multiline-static"
//            label="Query"
//            className={style.queryField}
//            multiline
//            rows={4}         
//             sx={{
//             width: '60%',
//             marginTop: '20px',
//          }} /> {errors.email && touched.email && <div>{errors.email}</div>}
//         <Button type='submit' onClick={()=>{validateEmail();validateUsername()}} variant="contained" className={style.btn}
       
//         >Send</Button>
//          </Form>
//        )}
//      </Formik>
       
        

//     </div>
//   )
// }

import React, { useState } from 'react';
import { Formik, Form, Field} from 'formik';
import { TextField, Button,Alert } from '@mui/material';
import style from './ContactUs.module.css';
import axios from 'axios';
export default function ContactUs() {
  const [isResponseSubmitted,setIsResponseSubmitted] = useState(false);
  const [isResponseErrored,setIsResponseErrored] = useState(false);
  const validate = (values) => {
    const errors = {};

    // Validate email
    if (!values.email) {
      errors.email = 'Required';
      setIsResponseErrored(true)
          
          setTimeout(() => {
            setIsResponseErrored(false);
          }, 3000);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    // Validate username
    if (values.username === 'admin') {
      errors.username = 'Nice try!';
      setIsResponseErrored(true)
          
          setTimeout(() => {
            setIsResponseErrored(false);
          }, 3000);
    }
    if (!values.username) {
      errors.username = `Name Can't be blank!`;
      setIsResponseErrored(true)
          
          setTimeout(() => {
            setIsResponseErrored(false);
          }, 3000);
    }
    if (!values.query){
      errors.query = `Required!`;
      setIsResponseErrored(true)
          
      setTimeout(() => {
        setIsResponseErrored(false);
      }, 3000);
    }
    return errors;
  };

  return (
    <div className={style.mainDiv}>
      <h1>Contact us</h1>
      {/* {isResponseErrored && (<Alert severity="success"  onClose={() => setIsResponseSubmitted(false)}>Message succesfully sent !</Alert>)} */}
      
      {isResponseSubmitted && (<Alert severity="success"  onClose={() => setIsResponseSubmitted(false)}>Message succesfully sent !</Alert>)}
      <Formik
        initialValues={{
          username: '',
          email: '',
          query: '',
        }}
        onSubmit={(values,{ resetForm }) => {
          resetForm({
            values: {
              username: '',
              email: '',
              query: '',
            },
          });
          setIsResponseSubmitted(true)
          
          setTimeout(() => {
            setIsResponseSubmitted(false);
          }, 3000);
          const postData = {
            email:values.email,
            username:values.username,
            query:values.query,
           
          };
          
          axios.post('http://localhost:3333/user/contact', postData, {
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers if needed
            },
          })
            .then(response => {
              console.log('Success:', response.data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
          console.log(values);
        }}
        validate={validate}
      >{({ errors, touched }) => (
        <Form style={{width:'100%'}}>
          <div className={style.formDiv}>
          <Field
           
            name="email"
            as={TextField}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{
              width: '60%',
              marginTop: '20px',
            }}
            error={(errors.email && touched.email)}
  helperText={errors.email && touched.email ? errors.email : ''}
          />
         

          <Field
            name="username"
            as={TextField}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{
              width: '60%',
              marginTop: '20px',
            }}
            error={(errors.username && touched.username)}
            helperText={errors.username && touched.username ? errors.username : ''}
          />
          
          <Field
            name="query"
            as={TextField}
            id="outlined-multiline-static"
            label="Query"
            multiline
            rows={4}
            sx={{
              width: '60%',
              marginTop: '20px',
            }}
            error={(errors.query && touched.query)}
            helperText={errors.query && touched.query ? errors.query : ''}
          />
         
          <Button type="submit" variant="contained" 
          
          sx={{
            marginTop: '20px',
            marginBottom:' 40px',
            marginLeft:'10px',
            fontWeight:'bold',
            color:'white',
            border:'2px rgb(0, 51, 102) solid',
            width:'80px',
          }}
          >
            Send
          </Button>
          </div>
        </Form>)}
      </Formik>
    </div>
  );
}
