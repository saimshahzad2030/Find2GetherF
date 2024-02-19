import React from 'react'
import style from './Column.module.css'
export default function Column({children,styles}) {
  return (
    <div className={style.column} style={styles} >
      {children}
    </div>
  )
}
