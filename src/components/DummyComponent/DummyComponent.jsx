import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function DummyComponent() {
    const [abc,xyz]=useState(false)
    useEffect(()=>{
        if (abc !== false) { // Check if abc is 's' before running the effect
            const formData3 = new FormData();
            formData3.append('image_url', 'https://i.aaj.tv/primary/2023/05/03125200e8011d7.webp');
            formData3.append('imageId', '123467890');
        
            axios.post('http://localhost:8000/api/upload-to-database', formData3, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(response => {
                    console.log(response.data);            
            }).catch(error => {
                    console.error('Error:', error);
            });
        }
    
    }
    ,[abc])
  return (
    <div style={{width:'140px',backgroundColor:'blue',height:'140px'}}>
      <button onClick={()=>{
        xyz('s')
      }}>dasdasdasd</button>
    </div>
  )
}
