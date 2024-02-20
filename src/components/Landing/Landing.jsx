import React, { useState, useEffect, useRef } from 'react';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';
export default function Landing() {
  const [showDiv, setShowDiv] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);


  useEffect(() => {
    // Set a timeout to add the show class after a delay (e.g., 100 milliseconds)
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 100);

    // Clear the timeout when the component unmounts to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);
  const images = [
    process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg', // Replace with the actual path to your images
    
    process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg',
    
    process.env.PUBLIC_URL + '/Assets/carrousel/3.jpg',
  ];
  const texts = [`
  It's disheartening that in today's interconnected world, the issue of missing children persists, casting a shadow on the safety and well-being of our most vulnerable members. Each day, countless families are confronted with the nightmare of a missing child, a harsh reality that transcends borders and leaves communities in anguish.`,
  `In the digital age, where information flows rapidly, the haunting specter of child abduction and disappearance continues to grow stronger. Despite our technological advancements, the world witnesses an unsettling surge in cases of missing kids, highlighting the profound challenges we face in safeguarding our children from harm.`,
  `As we navigate an ever-evolving landscape, it becomes imperative to unite in the fight against this grave issue. Embracing innovative solutions, community engagement, and the power of technology.Through collective effort, awareness, and advocacy, we can confront the challenges of missing kids and strive to build a future where no family has to endure the agony of separation from their loved ones`]
const imgRef = useRef(null)
const textRef = useRef(null)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the current image index to the next one
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    
      setTimeout(() => {
        imgRef.current.style.opacity = 0;
      }, 3500);
      setTimeout(() => {
        textRef.current.style.opacity = 0;

      }, 3500);
     
      imgRef.current.style.opacity = 1;
      textRef.current.style.opacity = 1;

    }, 4000); // Change the interval to 1000 milliseconds (1 second)

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [images.length,texts.length]); // Ensure useEffect runs only when the length of images changes

  return (
    <div className={style.mainDiv}>
      <div className={style.firstChild}>
        <div  className={`${style.div} ${showDiv ? style.show : ''}`}></div>
        <h1 className={style.h1}>
          Easeness to find missing ones...
        </h1>
        <h2  className={style.h2}> We are here for you </h2>
        <p className={style.p} ref={textRef}>{texts[currentTextIndex]}</p>
      <div className={style.btnDiv}>
        <Link to={'/explore'}><button className={style.btn} >Get started</button></Link>
      </div>
      </div>
      <div className={style.secondChild}>
  <img ref={imgRef}
    className={`${style.image} `}
  
    src={images[currentImageIndex]}
    alt={`Slide ${currentImageIndex + 1}`}
  />
</div>
    </div>
  )
}
