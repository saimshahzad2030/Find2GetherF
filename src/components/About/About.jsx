import React from 'react'
import style from './About.module.css'
export default function About() {
  return (
    <div className={style.mainDiv}>
      <img className={style.logo} src={process.env.PUBLIC_URL + '/Assets/logo/logo2.png'} alt="mobile pic" />
      <h1>About us</h1>
       
      <h3>Welcome to find2Gether, a groundbreaking AI-powered application dedicated to the noble cause of reuniting loved ones and fostering a sense of community for the betterment of humanity. In the palm of your hand, our innovative solution empowers users to make a difference by locating missing individuals through the use of their devices.</h3>
      <div className={style.insideDiv}>
        <h4>Key Features:</h4>
        <h5>Find Your Missing Ones:</h5>
        <p>Our app utilizes cutting-edge AI technology to help users locate their missing loved ones swiftly and efficiently. Whether it's a family member, friend, or someone in the community, we're here to assist in the search.</p>
     
        <h5>Be a Hero, Help Others:</h5>
        <p>We goes beyond the ordinary. If you come across someone who is missing, seize the opportunity to be a hero. Report the finding, contribute to our database, and play a pivotal role in reuniting families.</p>
     
        <h5>Track Record Database:</h5>
        <p>We maintain a comprehensive track record database, ensuring a centralized hub of information for missing individuals. Our goal is to create a supportive and interconnected community that actively participates in the well-being of others.</p>
     
        <h4>Our Mission:</h4>
        <p>At Our App, we are driven by a profound commitment to humanity and the betterment of our planet. Our mission is to harness the power of technology for the greater good, making a positive impact on lives globally.</p>
      <h4>Meet the Team:</h4>
      <h5>Mirza Saim Shahzad (Team Lead):</h5>
        <p>As the visionary leader behind Our App, Mirza Saim Shahzad guides our team with a passion for creating solutions that truly matter.</p>
        <h5>Umer Shahzad:</h5>
        <p> A dedicated member of our team, Umer Shahzad brings expertise and enthusiasm to every aspect of our application's development.</p>
        <h5>Waqar Ahmed Khan:</h5>
        <p>The technical backbone of Our App, Waqar Ahmed Khan's skills and innovation have been instrumental in bringing our vision to life.</p>
      
      
      
      
      </div>
    </div>
  )
}
