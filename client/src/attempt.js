import React from 'react'
import axios from 'axios'

export default function Hi() {
  function handleSubmit(e) {
    e.preventDefault()
    axios.get('/about/api')
    .then((res)=> {console.log(res)})
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