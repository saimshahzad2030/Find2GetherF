import React from 'react'
import style from './MainSection.module.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
export default function MainSection({styles,isLoggedIn}) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className={style.mainDiv} style={styles}>
      <h1 style={{textAlign:'center',fontWeight:'bold'}}>GET STARTED</h1>
      <div className={style.insideDiv}>
       <div className={style.parentDiv}>
       <div className={style.divChild}>
          <div className={style.imgDiv}>
          <img className = {style.img}src={process.env.PUBLIC_URL + '/Assets/contact/finding.png'} alt="suggestions" />
         
          </div>
           <h2 className={style.h2}>Finding someone?</h2>
          <div className={style.paraDiv}>
            <p>Are you finding your missing one? go ahead by clicking on button below</p>
          </div>
          <Link to = {isLoggedIn === false?'/findingSomeone':'/findingSomeone'}  onClick={()=>{ scrollToTop()}}><Button variant="contained"  sx={{fontWeight:'bold',color:'white',width:'140px',backgroundColor:' rgb(0, 51, 102);'}} >Click here</Button>
          </Link>
        </div>
       </div> <div className={style.parentDiv}>
        <div  className={style.divChild}>
        <div className={style.imgDiv}>
          <img className = {style.img}src={process.env.PUBLIC_URL + '/Assets/contact/found.png'} alt="suggestions" />
         
          </div>
           
          <h2 className={style.h2}>Found Someone?</h2>
          <div className={style.paraDiv}>
          <p>Have u find someone who do you think is a suspect and might be the one pwoples are looking for? go ahead with below button</p>
           </div>
          <Link to = {isLoggedIn === false?'/foundsomeone':'/foundsomeone'}  onClick={()=>{ scrollToTop();scrollToSection(`foundsomeone`)}}>
          <Button variant="contained"  sx={{fontWeight:'bold',color:'white',width:'140px',backgroundColor:' rgb(0, 51, 102)'}} >Click here</Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
