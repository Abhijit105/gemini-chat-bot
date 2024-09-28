import React, { useState } from 'react'

const App = () => {
  const [message, setMessage] = useState('')

  return (
    <main className='main'>
      <h1 className='title'>Hello Gemini</h1>
      <div className='buttons'>
        <button className='btn'>Go ahead and start chat</button>
        <button className='btn'>Let Gemini take the lead</button>
      </div>
      <form className='form'>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          className='textarea'
        ></textarea>
        <button type='submit' className='btn send'>
          Send
        </button>
      </form>
      <div className='chat'>
        <div className='chat-box'>
          <div className='chat-user'>
            <p className='label-user'>User:</p>
            <p className='text-user'>Hi! How are you?</p>
          </div>
          <div className='chat-gemini'>
            <p className='label-gemini'>Gemini:</p>
            <p className='text-gemini'>Hi! I'm fine!</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
