
// import style from './App.module.css'
import {CircularProgress } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Landing from "./components/Landing/Landing";
import MainSection from "./components/MainSection/MainSection";
import { Link } from "react-router-dom";
import Row from './components/Row/Row';
import Column from './components/Column/Column';
import {Input, Button } from "@mui/material";
import Footer from './components/Footer/Footer'
import { useState,useEffect, useRef } from "react";
import OurApp from "./components/OurApp/OurApp";
import About from "./components/About/About";
import ContactUs from "./components/ContactUs/ContactUs";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Next from './components/SignUp/Next'
import FindingSomeone from "./components/FindingSomeone(Uploader)/FindingSomeone";
import FoundSomeone from "./components/FoundSomeone/FoundSomeone"
import Cases from "./components/Cases/Cases";
import PersonalCase from "./components/PeronalCase/PersonalCase";
import DummyComponent from './components/DummyComponent/DummyComponent';
import axios from "axios";
function App() {
  const [type,setType] = useState('login')
  const [scrollY, setScrollY] = useState(0);
  const [isEffectApplied, setIsEffectApplied] = useState(false);
  const [isRowEffectApplied, setIsRowEffectApplied] = useState(false);
  const [forgotPass,setForgetPass] = useState(false)
const [loading,setLoading]=useState(true)
  
  const [firstname,setFirstname] = useState(' ');
  const [loggedIn,setLoggedIn] = useState(false);

  //signup buttons
  const [next,setNext]=useState(false)
const [verify,setVerify]=useState(false)

const [next2,setnext2] = useState(false)
//
const [showScreen, setScreen] = useState(false);
const [uploadedCases ,setUploadeCases]=useState([])
useEffect(() => {
  // Set a timer for 3 seconds
  const timer = setTimeout(() => {
    // After 3 seconds, update the state to true
    setScreen(true);
  }, 3000);

  // Clear the timer when the component unmounts or when the dependency changes
  return () => clearTimeout(timer);
}, []); // This effect runs only once when the component mounts
useEffect(()=>{
  setFirstname(JSON.parse(localStorage.getItem('firstname'))!==null?JSON.parse(localStorage.getItem('firstname')):' ')
},[])
useEffect(()=>{
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${JSON.parse(localStorage.getItem('token'))} ${JSON.parse(localStorage.getItem('username'))}`, // Add your authorization token here if needed
  };
  axios.post('http://localhost:3333/user/autoLogin',{} ,{headers})
    .then(response => {
      if(response.status!==401 ||response.status!==520 ||response.status!==402 ){
       console.log(response.data)
        

        axios.post('http://localhost:3333/user/login', {username:response.data.username,password:response.data.password}, {
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
              },
            })
              .then(response => {
                if(response.status!==401 ||response.status!==520 ){
                 
                 setLoggedIn(true);
                 setFirstname(response.data.firstname)
                 localStorage.setItem('token', JSON.stringify(response.data.token));
                 localStorage.setItem('username', JSON.stringify(response.data.username));
                 setLoading(false)
                }
              })
              .catch(error => {
               
                console.error('Error:', error);
              });
              
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
      setLoading(false)
      console.error('Error:', error);
    });
    
  
},
[loggedIn])

const scrollToSection = (id) => {
  console.log("Scrolling to ID:", id); // Log the ID parameter
  const element = document.getElementById(id);
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  } else {
      console.error(`Element with ID ${id} not found in the DOM.`);
      // Handle the situation where the element doesn't exist
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // const screenWidth = window.innerWidth;
  // if (screenWidth >= 750) {
  //     reference.current.style.display = 'flex';
  // }
  // else{
      
  //     reference.current.style.display = 'none';
  // }
};
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const handleScrollEffect = () => {
      if (!isEffectApplied) {
        // Check if the scroll position is beyond a certain point (e.g., 200)
        if (scrollY > 200) {
          // Apply your fade effect or any other effect here
          setIsEffectApplied(true); // Set the flag to indicate that the effect has been applied
        
        }
      }
      if (!isRowEffectApplied) {
        // Adjust the scroll position based on your design
        if (scrollY > 800) {
          setIsRowEffectApplied(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollEffect);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollEffect);
    };
  }, [isEffectApplied, isRowEffectApplied, scrollY]);

  const mainSectionOpacity = isEffectApplied ? 1 : 0;
  const rowSectionOpacity = isRowEffectApplied ? 1 : 0;
  // useEffect(()=>
  // {
  //   const handleResize = ()=>{
  //     const screenWidth = window.innerWidth;
  //   if (screenWidth >= 750) {
  //     reference.current.style.display = 'flex';
  //   } else {
  //     reference.current.style.display = 'none'; // or any other desired style
  //   }
    
  //   }
  //   handleResize();
  //   window.addEventListener('resize', handleResize);

  //   // Cleanup on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [reference])
  return (
<BrowserRouter>
   <Navbar loading={loading} uploadedCases={uploadedCases} setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} />


<Routes>
  <Route path="/" element={
    <>
   {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <Landing />
   <MainSection  isLoggedIn={loggedIn}/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px',opacity: rowSectionOpacity }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles={{ opacity: mainSectionOpacity }}><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>
   <Route path="/ourApp" element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <OurApp/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>

<Route path="/explore" element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <MainSection/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>
  
<Route path="/about" element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <About/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>
  
<Route path="/contactus" element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <ContactUs/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>


<Route path="/signin" element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
 <Next next = {next} setNext={setNext} verify = {verify} setVerify={setVerify} next2 = {next2} setnext2={setnext2} firstname={firstname} setfirstname={setFirstname} setLoggedIn = {setLoggedIn} type={'Sign up'} forgotPass={forgotPass}/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>
  
<Route path="/login" element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <LoginSignup setUploadeCases={setUploadeCases} setLoggedIn = {setLoggedIn} type={'Login'} setForgetPass = {setForgetPass} setfirstname = {setFirstname} firstname = {firstname}/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>

<Route path={`${loggedIn?'/findingSomeone':'/login'}`} element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <FindingSomeone/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>

<Route  path={`${loggedIn?'/foundSomeone':'/login'}`} element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
    <FoundSomeone/>
  {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>

<Route  path={`${loggedIn?'/cases':'/login'}`} element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <Cases/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>
<Route  path={`${loggedIn?'/personalCase':'/login'}`} element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
   <PersonalCase/>
   {/* <Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontFamily:'cursive'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop();scrollToSection(``);}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles = {{display:' '}} ><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer> */}
    </>
  }/>

<Route  path={`/dummy`} element={
    <>
    {/* <Navbar  setNext={setNext} setVerify={setVerify} setnext2={setnext2} setLoggedIn =  {setLoggedIn} setType={setType} firstname = {firstname} loggedIn = {loggedIn} scrollToSection={scrollToSection} scrollToTop={scrollToTop} reference={reference}/> */}
  <DummyComponent/>
       </>
  }/>

</Routes>
<Row styles={{paddingTop:'50px',paddingBottom:'50px' }} >
              <Column>
              <img src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="logo"/>
              <p style={{fontSize:'17px'}}>Solution to find missing ones and also a way to help others for finding their missing ones because together we can make this earth a better place..</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Contacts</h2>
              <p>+92 3142274221</p>
              <p>saimshehzad2030@gmail.com</p>
              </Column>
              <Column>
              <h2 style={{fontWeight:'bold',marginBottom:'10px',color:'white'}}>Links</h2>
              <p><Link onClick={()=>{scrollToTop()}} style={{textDecoration:'none',color:'aliceblue'}} to={'/'}>Home</Link></p>
              <p><Link onClick={()=>{scrollToTop()}} style={{textDecoration:'none',color:'aliceblue'}} to={'/ourApp'}>Our App</Link></p>
              <p><Link onClick={()=>{scrollToTop()}} style={{textDecoration:'none',color:'aliceblue'}} to={'/about'}>About us</Link></p>
              </Column>
              <Column>
              <Input placeholder="Type any Query..." sx={{marginTop:'20px',color:'white'}}/>
              <Button variant="outlined" sx={{margin:'20px',color:'white'}}>Send</Button>
   
              </Column>
             </Row>
             <Footer styles={{ opacity: mainSectionOpacity }}><h4 style={{color:'rgb(0, 51, 102)'}}>Copyright @ Saim Shahzad</h4></Footer>
</BrowserRouter>
//  <Backdrop open={loadingToken} style={{ display:caseSubmitted?'':'flex', flexDirection:'column' }}>
//  <CircularProgress sx={{color:'white'}}/>
//  <p style={{fontSize:'20px',color:'white'}}>Matching image</p>
// </Backdrop>
  );
}

export default App;
