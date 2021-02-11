import React from 'react'

export default function Hi() {
  function handleSubmit(e) {
    e.preventDefault()

    console.log("zzzZZZzzzZZZ...")
  }

  return (
    <div>
      <h1>HIIIIIIIII</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">CLICK FOR ROUTER EXAMPLE</button>
      </form>
    </div>
  )
}