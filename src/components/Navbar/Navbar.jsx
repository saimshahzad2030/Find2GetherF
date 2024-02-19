import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { Button ,Avatar} from '@mui/material';
import {FaBars} from 'react-icons/fa'
import axios from 'axios';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { upload } from '@testing-library/user-event/dist/upload';
export default function Navbar({setType,reference,scrollToSection,scrollToTop,loggedIn,firstname,setLoggedIn ,setNext, setVerify ,setnext2 }) {
  const [uploadedCases,setUploadeCases]=useState([])  
  useEffect(()=>{
    axios.get('http://localhost:3333/user/allUploadedCases',{
      params: {
          username: JSON.parse(localStorage.getItem('username'))
      }
  })
        .then(response => {
          if(response.status!==401 ||response.status!==520 ){
            console.log(response.status)
            setUploadeCases(response.data)
            
            
              }
        })
        .catch(error => {
          if(error.response){
                      console.error('Error:', error);
                      
              
          }
        })
  },[])
  // console.log(uploadedCases)
  const [scrolled, setScrolled] = React.useState(false);
    
    const [display,setDisplay] = React.useState(null)
    
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };
  
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
   
    React.useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const clickHandler = ()=>{
        if (display === 'flex') {
            reference.current.style.display = 'none';
            setDisplay('none');
        } else {
            reference.current.style.display = 'flex';
            setDisplay('flex');
        }


    

    }
    React.useEffect(()=>
    {
      const handleResize = ()=>{
        const screenWidth = window.innerWidth;
      if (screenWidth >= 750) {
        reference.current.style.display = 'flex';
      } else {
        reference.current.style.display = 'none'; // or any other desired style
      }
      
      }
      handleResize();
      window.addEventListener('resize', handleResize);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [reference])

  return (
   <nav className={`${style.nav} ${scrolled ? style.scrolled : ''}`}>
    <div className={style.logoDiv}>
        <Link  to={'/'}>  <img className={style.logo} src={process.env.PUBLIC_URL + '/Assets/logo/logo.png'} alt="Logo" />
       </Link>
       <button className={style.hideButton} onClick={clickHandler}>
        <FaBars size={30} />
        </button>
    </div>
   <div ref={reference} className={style.linkDiv}>
   <ul className={`${style.nav_ul} ${style.links}`}>
          <li ><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to={'/'}>Home</Link></li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to={'/ourApp'}>Our App</Link>
          
          </li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} 
       to={loggedIn?'/explore':'/login'}>Explore</Link>
              
          </li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to={'/about'}>About</Link></li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to='/contactus'>Contact us</Link></li>
         
          {loggedIn?<li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to='/cases'>Cases</Link></li>
          :<></>
        }
         

        </ul>
        <ul className={`${style.btn_ul}`}>
  {loggedIn === true ? (
    <><div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <Button sx={{color:'rgb(0, 51, 102)'}} onClick={handleDrawerToggle}><Avatar sx={{ bgcolor: 'rgb(0, 51, 102)',marginRight:'10px'}}>{firstname.charAt(0)}</Avatar>{firstname}</Button></div>
    <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width:'20%'
        }}
      >
        <div
        style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'space-between',
          height:'100%',
        }}>
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'flex-start',
          height:'100%',
        }}>
            {/* Your content inside the Drawer */}
            <IconButton onClick={handleDrawerToggle}>
            <ChevronRightIcon />
          </IconButton>
         
          <p style={{color:'rgb(0, 51, 102)',fontSize:'22px',fontWeight:'bold'}}>Your Cases</p>
          <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'flex-Start',
          
          width:'100%' ,height: '70%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' 
        }}>

          <>
          {uploadedCases && 
          (
            uploadedCases.map((uploadedCase,index) => (
             <Link to={'/personalCase'
             }> <Button 
             variant="contained" 
             key={uploadedCase._id}
             sx={{
                 fontWeight: 'bold',
                 color: 'white',
                 border: '2px white solid',
                 width: '100%',
                 marginTop: '10px'
             }}
             onClick={()=>{
               localStorage.setItem('clicked case',JSON.stringify(uploadedCase))
             }}
         >
            Case {index + 1} {/* Replace someProperty with the property you want to display */}
         </Button></Link>
          )))}</>
               {/* <Button variant="contained" 
        sx={{
           
            fontWeight: 'bold',
             color: 'white',
              border: '2px white solid',
               width: '100%' ,
               marginTop:'10px'
               }}>case</Button>
               <Button variant="contained" 
        sx={{
           
            fontWeight: 'bold',
             color: 'white',
              border: '2px white solid',
               width: '100%' ,
               marginTop:'10px'
               }}>case</Button>
               <Button variant="contained" 
        sx={{
           
            fontWeight: 'bold',
             color: 'white',
              border: '2px white solid',
               width: '100%' ,
               marginTop:'10px'
               }}>case</Button>
               <Button variant="contained" 
        sx={{
           
            fontWeight: 'bold',
             color: 'white',
              border: '2px white solid',
               width: '100%' ,
               marginTop:'10px'
               }}>case</Button>
               <Button variant="contained" 
        sx={{
           
            fontWeight: 'bold',
             color: 'white',
              border: '2px white solid',
               width: '100%' ,
               marginTop:'10px'
               }}>case</Button>
                <Button variant="contained" 
        sx={{
           
            fontWeight: 'bold',
             color: 'white',
              border: '2px white solid',
               width: '100%' ,
               marginTop:'10px'
               }}>case</Button>
                <Button variant="contained" 
        sx={{
           
            fontWeight: 'bold',
             color: 'white',
              border: '2px white solid',
               width: '100%' ,
               
               marginTop:'10px'
               }}>case</Button> */}
        </div>
        </div>
        
          <div>
          <Link to={'/'} onClick={() => { scrollToTop(); scrollToSection(`login`); setLoggedIn(false);localStorage.removeItem('username');localStorage.removeItem('token'); }}>
        <Button variant="outlined" 
        sx={{
           margin: '15px',
            fontWeight: 'bold',
             color: 'red',
              border: '2px red solid',
               width: '120px' 
               }}>Log out</Button>
      </Link>
          </div>
          {/* Add other content here */}
        </div>
      </SwipeableDrawer>
    </>
  ) : (
    <>
      <Link to={'/signin'} onClick={() => { scrollToTop(); scrollToSection(`signin`); setType('Sign up') ;setNext(false);setVerify(false);setnext2(false)}}>
        <Button variant="outlined" sx={{ marginLeft: '10px', fontWeight: 'bold', color: 'rgb(0, 51, 102)', border: '2px rgb(0, 51, 102) solid', width: '80px' }}>SignUp</Button>
      </Link>
      <Link to={'/login'} onClick={() => { scrollToTop(); scrollToSection(`login`); setType('Login') ;setNext(false);setVerify(false);setnext2(false) }}>
        <Button variant="outlined" sx={{ marginLeft: '10px', fontWeight: 'bold', color: 'rgb(0, 51, 102)', border: '2px rgb(0, 51, 102) solid', width: '80px' }}>Login</Button>
      </Link>
    </>
  )}
</ul>
   </div>

   </nav>
  )
}
