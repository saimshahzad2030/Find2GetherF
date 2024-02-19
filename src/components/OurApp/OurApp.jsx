import React from 'react'
import style from './OurApp.module.css'
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
export default function OurApp() {
  return (
    <div className={style.mainDiv}>
      <h1>Our App</h1>
      <div className={style.child}>
        <div className={`${style.child1} ${style['parent-div'] }`}>
        <img className={style.mobilePic} src={process.env.PUBLIC_URL + '/Assets/ourApp/banner.png'} alt="mobile pic" />
        </div>
        <div className={style.child1}>
          <h2>Why our App?</h2>
          <div className={style.listCollection}>
          <div className={style.list}>
            <img className={style.tick} src={process.env.PUBLIC_URL + '/Assets/ourApp/tick.png'} alt="tick logo"/>
            <h4>Easeness in Use</h4>
          </div>
          <div className={style.list}>
            <img className={style.tick} src={process.env.PUBLIC_URL + '/Assets/ourApp/tick.png'} alt="tick logo"/>
            <h4>Flexible</h4>
          </div>
          <div className={style.list}>
            <img className={style.tick} src={process.env.PUBLIC_URL + '/Assets/ourApp/tick.png'} alt="tick logo"/>
            <h4>Overall Control in one touch</h4>
          </div>
          <div className={style.list}>
            <img className={style.tick} src={process.env.PUBLIC_URL + '/Assets/ourApp/tick.png'} alt="tick logo"/>
            <h4>Offline Functionality</h4>
          </div>
          <div className={style.list}>
            <img className={style.tick} src={process.env.PUBLIC_URL + '/Assets/ourApp/tick.png'} alt="tick logo"/>
            <h4>Personalization</h4>
          </div>
          
          </div>
          <Button sx={{marginTop:'20px'}}>   <img className = {style.downloadApp} src={process.env.PUBLIC_URL + '/Assets/ourApp/app.png'} alt="download app" />
      </Button>
         </div>
      </div>
      
    </div>
  )
}
