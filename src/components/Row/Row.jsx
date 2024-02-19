import React from 'react'
import style from './Row.module.css'
export default function Row({children, styles}) {
  return (
    <div className={style.row} style={styles}>
      {children}
    </div>
  )
}
