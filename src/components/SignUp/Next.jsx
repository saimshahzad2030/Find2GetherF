import React, {useEffect, useRef, useState } from 'react';
import { Formik, Form, Field} from 'formik';
import { TextField, Button,Alert,Checkbox ,CircularProgress} from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import style from './Next.module.css';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function SignUp({type, forgotPass,setLoggedIn,setFirstname,next,verify,setNext,setVerify,next2,setnext2}) {

 const btnRef = useRef(null);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [isResponseSubmitted,setIsResponseSubmitted] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [termsColor,setTermsColor] = useState('grey');
    const [isChecked, setIsChecked] = useState(false);

const [btnDisabled, setBtnDisabled] = useState(true);
const [signupClicked,setSignupClicked] = useState(false);
const [tokenMatch,setTokenMatch] = useState(true);
const[errOnSignin,setErrOnSignin] = useState(false);
const [emailExist,setEmailExist] = useState(false);
const [signUpSuccesfull,setSignUpSuccesfull] = useState(false)
const [firstnameValue, setFirstNameValue] = useState('');
const [lastnameValue, setLastNameValue] = useState('');
const [usernameValue, setUserNameValue] = useState('');
const [passwordValue,setPasswordValue] = useState('')
//username checker
const [isUsernameUnique,setIsUsernameUnique] = useState();
const [displayIcon,setDisplayIcon] = useState(false)
const [loading, setLoading] = React.useState(false);
const [success, setSuccess] = React.useState(false);
const timer = useRef();


const [loadingToken, setLoadingToken] = useState(false);
 



useEffect(() => {
  return () => {
    clearTimeout(timer.current);
  };
}, []);




const handleChange = (event) => {
        setIsChecked(event.target.checked);
        console.log(!isChecked)
        if(!isChecked===false){
          setBtnDisabled(true)
        }
        else{
          setBtnDisabled(false)
        }
       termsColor === 'grey'?setTermsColor('black'):setTermsColor('grey')
    };

    const handleChangePassword = (e)=>{
    setPasswordValue(e.target.value)
    }



const handleChangeFirstName = (e)=>{
  const value = e.target.value;

  
    // Use a regular expression to check if the input contains only letters
    if (/^[A-Za-z\s]+$/.test(value) || value === '') {
      setFirstNameValue(value);
      
}

}
const handleChangeLastName = (e)=>{
  const value = e.target.value;

    // Use a regular expression to check if the input contains only letters
    if (/^[A-Za-z\s]+$/.test(value) || value === '') {
    
      setLastNameValue(value)
}

}
const handleChangeUsername = (e)=>{
  const value = e.target.value;
axios.get('http://localhost:3333/user/checkUsernameAvailability',{
              
headers: {
   'Authorization': `${value}`,
   // Add any other headers if needed
 },
})
 .then(response => {
if(response.data.unique === true){
  setIsUsernameUnique(true);
  setBtnDisabled(false)
  if(usernameValue !== ''){
    setNameErrors((prevErrors)=>({
      ...prevErrors,
      username : ''
    }));
  }
}
else if(response.data.unique === false){
  setIsUsernameUnique(false);
  setNameErrors((prevErrors)=>({
    ...prevErrors,
    username : 'Already Taken'
  }));
  setBtnDisabled(true)

}

 })
 .catch(error => {
  
   console.error('Error:', error);
 });
  




    // Use a regular expression to check if the input contains only letters
    if (/^[A-Za-z]*[0-9]*$/.test(value) ||  value === '') {
      setUserNameValue(value);
    }
   


if (!loading) {
  setDisplayIcon(true)
  setSuccess(false);
  setLoading(true);
  timer.current = window.setTimeout(() => {
    setSuccess(true);
    setLoading(false);
  }, 400);
}
}
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      //change Username
      const [nameErrors,setNameErrors] = useState({username:'',firstname:'',lastname:''});
useEffect(()=>{

       
        if(!firstnameValue){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            firstname : 'Required'
          }));
          setBtnDisabled(true)
  
        }
        else if(firstnameValue){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            firstname : ''
          }));
          setBtnDisabled(true)
  
        }
        if(!lastnameValue){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            lastname : 'Required'
          }));
          setBtnDisabled(true)
  
        }
        else if(lastnameValue){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            lastname : ''
          }));
          setBtnDisabled(true)
  
        }
        if(!usernameValue ){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            username : 'Required'
          }));
          setSuccess(false)
          setBtnDisabled(true)
        }
        else if(usernameValue){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            username : ''
          }));
          setBtnDisabled(false)
        }
        if(usernameValue ===''){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            username : 'Required'
          }));
          setSuccess(false)
          setBtnDisabled(true)
        }
        if(isUsernameUnique === false){
          setNameErrors((prevErrors)=>({
            ...prevErrors,
            username : 'Username must be Unique'
          }));
          setBtnDisabled(true)
      
        }
       if (usernameValue!== '' && firstnameValue!== '' && lastnameValue!== '' && isUsernameUnique === true){
        setNameErrors({
          firstname:'',
          username:'',
          lastname:''
        })
        setBtnDisabled(false)
       }
       console.log(btnDisabled)
      }
      
,[firstnameValue,lastnameValue,usernameValue])

//Password Validation
const [passwordErrors,setPasswordErrors]=useState({password:''})
useEffect(()=>{
    if(!passwordValue){
       setPasswordErrors(prevErrors=>({
        ...prevErrors,
        password:'Required'
       }))
       
       setBtnDisabled(true)
     }
     
     if(passwordValue.length <6 && passwordValue.length>1){
      setPasswordErrors(prevErrors=>({
        ...prevErrors,
        password:'Type Strong Password'
       }))
     
       setBtnDisabled(true)
 }
 if(passwordValue !== "" && passwordValue.length>5 && !isChecked){
  setPasswordErrors(prevErrors=>({
    ...prevErrors,
    password:''
   }))
 
   setBtnDisabled(false)
 }
},[passwordValue])




//Email Validation
const [emailValue,setEmailValue]=useState('')
const [emailErrors,setEmailErrors]=useState({email:''})
const handleChangeEmail = (e)=>{
  setEmailExist(false)
  setEmailValue(e.target.value)
  }

useEffect(()=>{
    if (!emailValue) {
      setEmailErrors({
        email:'Required'
      })
      setBtnDisabled(true)
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
      setEmailErrors({
        email:'Enter Valid Email'
      })
      setBtnDisabled(true)

    }
    else{
      setEmailErrors({
        email:''
      })
      setBtnDisabled(false)

    }
   console.log(emailErrors.email)
},[emailValue])



//Token Validation
const [tokenValue,setTokenValue] = useState('')
const [tokenErrors,setTokenErrors] = useState({token:''})
const handleChangeToken = (e)=>{
  setTokenValue(e.target.value)
  setTokenMatch(true)
}
useEffect(()=>{
  if(!tokenValue){
    setTokenErrors({
      token:'Required'
    })
    setBtnDisabled(true)
  }
  else if(tokenValue){
    setTokenErrors({
      token:''
    })
    setBtnDisabled(false)

  }
   
},[tokenValue])


  
    return (
      <div className={style.mainDiv}>
        <h1>{forgotPass === true?('Enter the email'): type}</h1>
        <Formik
          initialValues={{
            email: '',
            token:'',
            password:'',
            username:'',
            firstname:'',
            lastname:''
          }}
          onSubmit={(values,{ resetForm }) => {
            if(errOnSignin === false){
              resetForm({
                values: {
                  email: '',
                  token:'',
                  password:'',
                  username:'',
                  firstname:'',
                  lastname:''
                },
              })
              setIsResponseSubmitted(true)
              setTimeout(() => {
                setIsResponseSubmitted(false);
                setSignUpSuccesfull(false)
              }, 3000);
            }
           
            
           
           
          }}
        >{({ touched}) => (
          
          <>
           
          
         {( tokenMatch ) && (<Alert severity="success"  onClose={() => setIsResponseSubmitted(false)} sx={{display:next === true && verify === true && tokenMatch  === true?'':'none'}}>{emailValue} Verified</Alert>)}
        {<><p style={{fontSize:'24px',display:next ===true && verify === true && next2 === true && signupClicked === false?'':'none'}}>Enter Pass</p></>}
        {(isResponseSubmitted) && (<Alert severity="success"  onClose={() => setIsResponseSubmitted(false)} sx={{}}>Succesfully Logged In!</Alert>)}
       {<p style={{  display: (next ===false && verify === false && signupClicked === false)?'':'none'
            }}>Note: You should have logged in to access additional features of appplications</p>}
           <Form style={{width:'100%'}}>
            <div className={style.formDiv}>

  
            <Field
             
             name="email"
             as={TextField}
            id = 'outlined-basic'
            value = {emailValue}
             label="Email"
             variant="outlined"
             sx={{
               width: '40%',
               marginTop: '20px',
               display: (next ===false && verify === false && signupClicked === false)?'':'none'
              }}
              onChange={handleChangeEmail}
              error={(emailErrors.email && touched.email)}
              helperText={emailErrors.email && touched.email ? emailErrors.email : ''}
              
              />
             
           <div style={{ display:next ===true && verify === true && next2 === false && signupClicked === false?'flex':'none',flexDirection:'column',alignItems:'flex-start',justifyContent:'space-evenly', width:'40%'}}>
           <Field
             
             name="firstname"
             as={TextField}
         
            id = 'outlined-basic'
            value={firstnameValue}
             label="Firstname"
             variant="outlined"
             sx={{
               width: '100%',
               
              marginTop:'20px'
              }}
            
              onChange = {
                handleChangeFirstName
              }
              error={(nameErrors.firstname && touched.firstname)}
              helperText={nameErrors.firstname && touched.firstname? nameErrors.firstname : ''}
               
              />
  <Field
             
             name="lastname"
             as={TextField}
           
            id = 'outlined-basic'
            value = {lastnameValue}
             label="Lastname"
             variant="outlined"
             sx={{
               width: '100%',
              marginTop:'20px'}}
              
              
              onChange = {
                handleChangeLastName
               }
              error={(nameErrors.lastname && touched.lastname)}
              helperText={nameErrors.lastname && touched.lastname? nameErrors.lastname : ''}
              
              />
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',width:'100%'}}>
<Field
             
             name="username"
             as={TextField}
defaultValue="Enter Username"

            
             label="Username"
             variant="outlined"
             value = {usernameValue}
             sx={{
               width:`90%`,
               marginTop: '20px'
               ,display:next ===true && verify === true && signupClicked === false?'':'none'}}
             
              onChange = {
                handleChangeUsername
              }
              error={(nameErrors.username && touched.username )}
              helperText={nameErrors.username && touched.username ? nameErrors.username : ''}
              
              />
              {success ? 
              <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',width:'10%',marginTop:nameErrors.username ===''?'15px':''}}>
                <CheckIcon sx={{display:!displayIcon || !isUsernameUnique?'none':'',color:'green',marginLeft:'20px'}}/>
                {/* <p style={{display:!displayIcon || !isUsernameUnique?'none':'',color:'green',}}>Unique</p>  */}
                <ClearIcon sx={{display:!displayIcon || isUsernameUnique?'none':'',color:'red'}}/>
                {/* <p style={{display:!displayIcon || isUsernameUnique?'none':'',color:'red',}}>Already Taken</p> */}
                </div>:<></> }
              {loading && (
               <CircularProgress
            size={40}
            sx={{
              marginLeft:'30px',
              color: 'green'
            }}
          />
)}</div>
           </div>
               

     
           <FormControl sx={{ m: 1, width: '40% ' , marginTop:'20px' ,display:next ===true && verify === true && next2 === true && signupClicked === false?'':'none'}}
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
        <Backdrop open={loadingToken} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
{<>
  <p
style={{
  display:next ===true && verify === false?'':'none',width:'40%',textAlign:'center'
}}>Note: We have sent you a verification email to {emailValue} kindly check it and verify your email. Enter the token below that we have sent to you via email</p>
        <Field
             
             name="token"
             as={TextField}
             value={tokenValue}
          label="Token"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '40%' , display:next ===true && verify === false?'':'none'}}
          onChange={handleChangeToken}
          error={(tokenErrors.token && touched.token)}
          helperText={tokenErrors.token && touched.token ? tokenErrors.token : ''}
          
          InputProps={{
            startAdornment: <InputAdornment position="start">B-</InputAdornment>,
          }}
          
        />
          </>}
       {/* <p
style={{
  display:verify ===false && next ===true && !tokenMatch?'':'none',width:'40%',color:'red',textAlign:'center'
}}>Tokens not matched</p> */}
   
  <div className={style.row} style={{
    display:next ===true && verify === true && next2 ===true && signupClicked === false?'flex':'none'
  }}>
    <Checkbox {...label} 
      checked={isChecked}
      onChange={handleChange}
    />
    <p style={{ color: termsColor }}>I agree with the terms and conditions</p>
  </div>

           <div className={style.row}>
          <Link to={'/login'}> <Button variant="contained" 
            
           
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'150px',
              display:emailExist && next === false && verify ===false?'':'none'
            }}
            >
              Login?
            </Button></Link>
           <Button   variant="contained" 
           disabled={ btnDisabled}
            onClick={()=>{
              
              const sendToken = {
                email:emailValue,
                forgetPass:forgotPass
              };
              setLoadingToken(true);
            axios.post('http://localhost:3333/user/sendToken', sendToken, {
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
              },
            })
              .then(response => {
                if(response.status!==409 || response.status!==410 || response.status!==520){
                  setNext(true);
                  setBtnDisabled(true);
                  setEmailExist(false)
                  setEmailErrors({email:''})
                  
                }
              })
              .catch(error => {
                if(error.response && ((error.response.data.message === 'email already exist') || (error.response.data.message ==="You are a blocked user") || error.response.data.message ===("internal server error"))){
                  
                  setNext(false)
                  setEmailExist(true)
                  setEmailErrors({email:error.response.data.message})
                }
                console.error('Error:', error);
              }).finally(() => {
                setLoadingToken(false); // Close the backdrop regardless of success or failure
              });
            }}
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'100px',
              display:next ===false && verify === false?'':'none'
            }}
            >
              Next
            </Button>
           </div>
           <div className={style.row}>
           <Button variant="contained" 
            
             onClick={()=>{
               setVerify(false)
               setNext(false)
           setEmailExist(false)
setTokenMatch(true)
             }}
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'150px',
              display:next === true && verify ===false?'':'none'
            }}
            >
              Back
            </Button>
           <Button variant="contained" 
             disabled={btnDisabled}
             onClick={()=>{
              console.log(tokenValue)
              axios.get('http://localhost:3333/user/verifyToken',{
              
               headers: {
                  'Authorization': `${emailValue} ${tokenValue}`,
                  // Add any other headers if needed
                },
              })
                .then(response => {
               if(tokenValue === response.data.checkToken.token){
                setVerify(true);
                setBtnDisabled(true);
                setTokenErrors({
                  token:''
                })
                setTokenMatch(true)
                axios.delete('http://localhost:3333/user/deleteToken',{
                  data: {
                    email: emailValue,
                    token: tokenValue
                  }, 
                  headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                  },
                })
                 .then(response => {
                 })
                 .catch(error => {
                
                   console.error('Error:', error);
                 });
                  
             
                
               }
              
                })
                .catch(error => {
                  if(error.response && error.response.status !== 200){
                      
                setVerify(false);
               setTokenMatch(false)
              setTokenErrors({token:error.response.data.message})
                  }
                  console.error('Error:', error);
                });
                 
            
          
            
             }}
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'150px',
              display:next ===true && verify === false?'':'none'
            }}
            >
              Verify Email
            </Button>
           </div>
           <Button   variant="contained" 
           
           disabled={btnDisabled
          }
          ref={btnRef}
            onClick={()=>{
              setnext2(true)
            setBtnDisabled(true)
            setNameErrors({
              firstname: '',
              lastname: '',
              username: '',
            })
            }}
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'100px',
              display:next ===true && verify === true && next2 ===false &&  signupClicked === false?'':'none'
            }}
            >
              Next
            </Button>
            
            <Button variant="contained" 
             disabled={( btnDisabled  )}
             onClick={()=>{
            
              setSignupClicked(true)
              setPasswordErrors({
                password:''
              })
             
          
            
             }}
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'150px',
              display:next ===true && verify === true && next2 ===true && signupClicked === false?'':'none'
            }}
            >
              Signin
            </Button>
            <Link to={'/'}>
            <Button type='submit' variant="contained" 
             disabled={( btnDisabled  )}
             onClick={()=>{
              
            axios.post('http://localhost:3333/user/signup',
              {email:emailValue,
                username:usernameValue,
                password:passwordValue,
                firstname:firstnameValue,
                lastname:lastnameValue
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  // Add any other headers if needed
                },
              })
                .then(response => {
               if(response.status ===200){
                setLoggedIn(true);
                setSignupClicked(true)
                setNext(false)
                setVerify(false)
                setnext2(false)
                console.log('firstname:',firstnameValue)
                console.log('firstname:',emailValue)
                console.log('firstname:',usernameValue)
                console.log('firstname:',lastnameValue)
                console.log('firstname:',passwordValue)
                
                localStorage.setItem('username',JSON.stringify(usernameValue))
                localStorage.setItem('firstname',JSON.stringify(firstnameValue))
                localStorage.setItem('token', JSON.stringify(response.data.token));
              
                  console.log('response200:',response.data)
                  // setFirstname(firstnameValue)
                 }
              else{
                console.log('responsenot200:',response.data)
              }
                })
                .catch(error => {
                  if(error.response && error.response.status !== 200){
                    setVerify(true);
                    setBtnDisabled(false);
                   setErrOnSignin(true)
                     alert(error.response.data.message)
                  }
                  console.error('Error:', error);
                })
                 
            
          
            
             }}
            sx={{
              marginTop: '20px',
              marginBottom:' 40px',
              marginLeft:'10px',
              fontWeight:'bold',
              color:'white',
              border:'2px rgb(0, 51, 102) solid',
              width:'250px',
              display:next ===true && verify === true && next2 ===true && signupClicked === true?'':'none'
            }}
            >
              Login as {firstnameValue}?
            </Button>
            </Link>
            </div>
          </Form>
          </>
         )}
        </Formik>
      </div>
    );
  }

