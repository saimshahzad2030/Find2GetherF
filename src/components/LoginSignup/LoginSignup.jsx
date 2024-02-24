import React, { useState ,useEffect} from 'react';
import { Formik, Form, Field} from 'formik';
import { TextField, Button,Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import style from './LoginSignup.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginSignup({setUploadeCases,type,setForgetPass,setLoggedIn,firstname,setfirstname}) {
  const [isResponseSubmitted,setIsResponseSubmitted] = useState(false);
  const [isResponseErrored,setIsResponseErrored] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loginBtnClicked, setLoginBtnClicked] = useState(false);
const [erroredResponse,setErroredResponse] = useState();
  const[ loginSuccessfull,setloginSuccessful]=useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

      

//Email & password validation

const [passwordValue,setPasswordValue] = useState('')
const handleChangePassword = (e)=>{
  setPasswordValue(e.target.value)
  }

const [passwordErrors,setPasswordErrors]=useState({password:''})
const [emailValue,setEmailValue]=useState('')
const [emailErrors,setEmailErrors]=useState({email:''})
const handleChangeEmail = (e)=>{
  setEmailValue(e.target.value)
  }

useEffect(()=>{
    if (!emailValue) {
      setEmailErrors({
        email:'Required'
      })
      setBtnDisabled(true)
    } 

    else if (emailValue){
        setEmailErrors({
          email:''
        })
        setBtnDisabled(false)
      }
    else if(!passwordValue){
      setPasswordErrors(prevErrors=>({
       ...prevErrors,
       password:'Required'
      }))
      
      setBtnDisabled(true)
    }
    else if(passwordValue){
     setPasswordErrors({
       
       password:''
      })
      setBtnDisabled(false)
    }
  
},[emailValue,passwordValue])

      

  
  
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
      if (!values.password) {
        errors.password = `Enter Password`;
        setIsResponseErrored(true)
            
            setTimeout(() => {
              setIsResponseErrored(false);
            }, 3000);
      }
      
      return errors;
    };
  
    return (
      <div className={style.mainDiv}>
        <h1>{type}</h1>
        {(loginSuccessfull === false && loginBtnClicked)&& (<Alert severity="warning"  onClose={() => setloginSuccessful(false)}>{erroredResponse}</Alert>)}
        
        {loginSuccessfull && (<Alert severity="success"  onClose={() => setIsResponseSubmitted(false)}>Succesfully Logged in!!!</Alert>)}
        {<p style={{  display:loginSuccessfull?'none':''
            }}>Note: You should have logged in to access additional features of appplications</p>}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values,{ resetForm }) => {
            // resetForm({
            //   values: {
            //     email: '',
            //     password: '',
            //   },
            // });
            setIsResponseSubmitted(true)
            
            setTimeout(() => {
              setIsResponseSubmitted(false);
            }, 3000);
            
            
            console.log(values);
          }}
          validate={validate}
        >{({ errors, touched ,isValid,values}) => (
          <Form style={{width:'100%'}}>
            <div className={style.formDiv}>
            <Field
             
             name="email"
             as={TextField}
            id = 'outlined-basic'
            value = {emailValue}
             label="Email or Username"
             variant="outlined"
             sx={{
               width: '40%',
               marginTop: '20px',
              display:loginSuccessfull?'none':""}}
              onChange={handleChangeEmail}
              error={(emailErrors.email && touched.email)}
              helperText={emailErrors.email && touched.email ? emailErrors.email : ''}
              />
           

           <FormControl sx={{ m: 1, width: '40% ' , marginTop:'20px'
           ,
           display:loginSuccessfull?'none':""}}
            variant="outlined" 
            error={(passwordErrors.password && touched.password)}
           helperText={passwordErrors.password && touched.password ? passwordErrors.password : ''}
            >
          <InputLabel htmlFor="outlined-adornment-password"
           >{passwordErrors.password?passwordErrors.password:'Enter Pass'}</InputLabel>
          <Field
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name = 'password'
            as = {OutlinedInput}
            value = {passwordValue}
           onChange = {handleChangePassword}
            
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          
          />
        </FormControl>
        
<div className={style.row}>
<Link to = {'/signin'}>
<Button variant="contained" 
            
            onClick={()=>{setForgetPass(true)}}
           sx={{
             marginTop: '20px',
             marginBottom:' 40px',
             marginLeft:'10px',
             fontWeight:'bold',
             color:'white',
             border:'2px rgb(0, 51, 102) solid',
             width:'200px',
             display:loginSuccessfull?'none':''
           }}
           >
            Forgot password?
           </Button>
</Link>
<Link to = {'/'}>
<Button variant="contained" 
            
            
           sx={{
             marginTop: '20px',
             marginBottom:' 40px',
             marginLeft:'10px',
             fontWeight:'bold',
             color:'white',
             border:'2px rgb(0, 51, 102) solid',
             width:'200px',
             display:loginSuccessfull === true?'':'none'
           }}
           >
            Login as {firstname}?
           </Button>
</Link>
<Button type="submit" variant="contained" 
            disabled={btnDisabled}
            onClick={()=>{
             setLoginBtnClicked(true)
    console.log()

           if(emailValue.includes('@') ||emailValue.includes('.')){
            axios.post('http://localhost:3333/user/login', {email:emailValue,password:passwordValue}, {
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
              },
            })
              .then(response => {
                if(response.status!==401 ||response.status!==520 ){
                  setBtnDisabled(true);
                 setloginSuccessful(true);
                 setLoggedIn(true);
                 setfirstname(response.data.firstname)
                 localStorage.setItem('token', JSON.stringify(response.data.token));
                 localStorage.setItem('username', JSON.stringify(response.data.username));
                 localStorage.setItem('firstname', JSON.stringify(response.data.firstname));
                 axios.get('http://localhost:3333/user/allUploadedCases',{
                  params: {
                      username: JSON.parse(localStorage.getItem('username'))
                  }
              })
                    .then(response => {
                      if(response.status!==401 ||response.status!==520 ){
                        console.log('uploadedCases Fetched',response.status)
                        setUploadeCases(response.data)
                        
                        
                          }
                    })
                    .catch(error => {
                      if(error.response){
                                  console.error('Error:', error);
                                  
                          
                      }
                    })
                }
              })
              .catch(error => {
                if(error.response){
                 setloginSuccessful(false);
                setErroredResponse(error.response.data.message)
               
                }
                console.error('Error:', error);
              });
              
            }
          else{
            
              axios.post('http://localhost:3333/user/login', {username:emailValue,password:passwordValue}, {
                headers: {
                  'Content-Type': 'application/json',
                  // Add any other headers if needed
                },
              })
                .then(response => {
                  if(response.status!==401 ||response.status!==520 ){
                    setBtnDisabled(true);
                   setloginSuccessful(true);
                   setLoggedIn(true);
                   setfirstname(response.data.firstname)
                   console.log(response.data)
                   localStorage.setItem('token', JSON.stringify(response.data.token));
                   localStorage.setItem('username', JSON.stringify(response.data.username));
                   
                 localStorage.setItem('firstname', JSON.stringify(response.data.firstname));

                 axios.get('http://localhost:3333/user/allUploadedCases',{
                  params: {
                      username: JSON.parse(localStorage.getItem('username'))
                  }
              })
                    .then(response => {
                      if(response.status!==401 ||response.status!==520 ){
                        console.log('uploadedCases Fetched',response.status)
                        setUploadeCases(response.data)
                        
                        
                          }
                    })
                    .catch(error => {
                      if(error.response){
                                  console.error('Error:', error);
                                  
                          
                      }
                    })
                  }
                })
                .catch(error => {
                  if(error.response){
                   setloginSuccessful(false);
                  setErroredResponse(error.response.data.message)
                 
                  }
                  console.error('Error:', error);
                });
                
              }
          }
          }
           
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'100px',
              display:loginSuccessfull?'none':''
            }}
            >
              {type}
            </Button>
</div>
            </div>
          </Form>)}
        </Formik>
      </div>
    );
  }

