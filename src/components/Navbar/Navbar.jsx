import React, { useEffect, useState,useRef } from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { Button ,Avatar,CircularProgress} from '@mui/material';
import {FaBars} from 'react-icons/fa'
import axios from 'axios';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function Navbar({setType,loading,scrollToSection,scrollToTop,loggedIn,uploadedCases ,firstname,setLoggedIn ,setNext, setVerify ,setnext2 }) {
  // const [uploadedCases,setUploadeCases]=useState([])  
  const reference = useRef(null)
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
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
  // useEffect(()=>{
  //   axios.get('http://localhost:3333/user/allUploadedCases',{
  //     params: {
  //         username: JSON.parse(localStorage.getItem('username'))
  //     }
  // })
  //       .then(response => {
  //         if(response.status!==401 ||response.status!==520 ){
  //           console.log(response.status)
  //           setUploadeCases(response.data)
            
            
  //             }
  //       })
  //       .catch(error => {
  //         if(error.response){
  //                     console.error('Error:', error);
                      
              
  //         }
  //       })
  // },[uploadedCases])
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
    // React.useEffect(()=>
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
   <nav className={`${style.nav} ${scrolled ? style.scrolled : ''}`}>
    <div className={style.logoDiv}>
        <Link  to={'/'}>  <img className={style.logo} src={process.env.PUBLIC_URL + '/Assets/logo/logo2.png'} alt="Logo" />
       </Link>
       <button className={style.hideButton} onClick={clickHandler}>
        <FaBars size={30} />
        </button>
    </div>
   <div ref={reference} className={style.linkDiv}>
   <ul className={`${style.nav_ul} ${style.links}`}>
          {/* <li ><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to={'/'}>Home</Link></li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to={'/ourApp'}>Our App</Link>
          
          </li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} 
       to={loggedIn?'/explore':'/login'}>Explore</Link>
              
          </li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to={'/about'}>About</Link></li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to='/contactus'>Contact us</Link></li>
         
          {loggedIn?<li><Link  className={style.link}  onClick={()=>{ scrollToTop();scrollToSection(``)}} to='/cases'>Cases</Link></li> */}

<li ><Link  className={style.link}  onClick={()=>{scrollToTop() }} to={'/'}>Home</Link></li>
          <li><Link  className={style.link}  onClick={()=>{scrollToTop() }} to={'/ourApp'}>Our App</Link>
          
          </li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop() }} 
       to={loggedIn?'/explore':'/login'}>Explore</Link>
              
          </li>
          <li><Link  className={style.link}  onClick={()=>{scrollToTop()  }} to={'/about'}>About</Link></li>
          <li><Link  className={style.link}  onClick={()=>{ scrollToTop() }} to='/contactus'>Contact us</Link></li>
         
          {loggedIn?<li><Link  className={style.link}  onClick={()=>{ scrollToTop() }} to='/cases'>Cases</Link></li>
          :<></>
        }
         

        </ul>
        <ul className={`${style.btn_ul}`}>
  {loading?<>
    <CircularProgress
            size={20}
            sx={{
              marginLeft:'20px',
              color: 'rgb(0, 51, 102)'
            }}
          />
  </>:<>{loggedIn === true ? (
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
           <Button variant="outlined" 
           onClick={()=>{
            setOpen(true)
           }}
        sx={{
           margin: '15px',
            fontWeight: 'bold',
             color: 'red',
              border: '2px red solid',
               width: '120px' 
               }}>Log out</Button>
               
  
          </div>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Dou you want to Log out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will no longer be able to avail any service till you login again. Do you wanna logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" sx={{ fontWeight: 'bold', color: 'blue', border: '2px rgb(0,51,140) solid', width: '140px', marginTop: '25px', marginBottom: '20px' }}
               >Cancel</Button>
                <Link to={'/'} onClick={() => { scrollToTop(); setLoggedIn(false);localStorage.removeItem('username');localStorage.removeItem('token');localStorage.removeItem('firstname'); }}>
      
          <Button onClick={()=>{
           
          handleClose();
          }} variant="outlined" sx={{ fontWeight: 'bold', color: 'red', border: '2px red solid', width: '140px', marginTop: '25px', marginBottom: '20px' }}
                autoFocus>
            Logout
          </Button>
          </Link>
        </DialogActions>
      </Dialog>
          {/* Add other content here */}
        </div>
      </SwipeableDrawer>
    </>
  ) : (
    <>
      <Link to={'/signin'} onClick={() => { scrollToTop(); setType('Sign up') ;setNext(false);setVerify(false);setnext2(false)}}>
        <Button variant="outlined" sx={{ marginLeft: '10px', fontWeight: 'bold', color: 'rgb(0, 51, 102)', border: '2px rgb(0, 51, 102) solid', width: '80px' }}>SignUp</Button>
      </Link>
      <Link to={'/login'} onClick={() => { scrollToTop();setType('Login') ;setNext(false);setVerify(false);setnext2(false) }}>
        <Button variant="outlined" sx={{ marginLeft: '10px', fontWeight: 'bold', color: 'rgb(0, 51, 102)', border: '2px rgb(0, 51, 102) solid', width: '80px' }}>Login</Button>
      </Link>
    </>
  )}</>}
</ul>
   </div>

   </nav>
  )
}
