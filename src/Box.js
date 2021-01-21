import React, { useState } from 'react'

export default function Box(props) {
  const [color, setColor] = useState("red")

  return (
    <button
        onClick={setColor(() => {
          return color === "red" ? "blue" : "red"
        })

      }>
      {color}
    </button>

  )
}

