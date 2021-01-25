import React, { useReducer, useState } from 'react'

export default function Box(props) {
  // const [color, setColor] = useReducer("red")

  return (
    <div className={props.className}>
      <p>{props.text}</p>
    </div>

  )
}

