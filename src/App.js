import React, { useState, useRef } from 'react'

const App = () => {
  const [messageUser, setMessageUser] = useState('')
  const [history, setHistory] = useState([])
  const [isGeminiResponsePaused, setIsGeminiResponsePaused] = useState(false)
  const [isGeminiTooltipDisplayed, setIsGeminiTooltipDisplayed] =
    useState(false)

  const textareaRef = useRef()

  const chatUser = () => {
    setMessageUser('')
    textareaRef.current.focus()
  }

  const getGeminiResponse = async () => {
    try {
      const response = await fetch('http://localhost:8080/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageUser,
          history,
        }),
      })
      const data = await response.json()
      const { status, messageGemini, messageError } = data
      console.log(data)
      if (status === 'failure') {
        console.log(messageError)
        return
      } else if (status === 'success') {
        const chatGemini = {
          role: 'model',
          parts: [{ text: messageGemini }],
        }
        !!messageGemini && setHistory(history => [...history, chatGemini])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setMessageUser('')
      textareaRef.current.focus()
    }
  }

  const sendMessage = async e => {
    e.preventDefault()
    if (!messageUser) return
    const chatUser = {
      role: 'user',
      parts: [{ text: messageUser }],
    }
    !!messageUser && setHistory(history => [...history, chatUser])
    if (isGeminiResponsePaused) return
    await getGeminiResponse()
  }

  const chatGemini = async () => {
    if (isGeminiResponsePaused) return
    await getGeminiResponse()
  }

  return (
    <main className='main'>
      <h1 className='title'>Hello Gemini 🤖</h1>
      <div className='buttons'>
        <button className='btn' onClick={chatUser}>
          {history && history.length === 0
            ? 'Go ahead and start chat'
            : 'Keep on talking'}
        </button>
        <div className='btn-container'>
          <button
            className='btn'
            onClick={chatGemini}
            onMouseOver={() => setIsGeminiTooltipDisplayed(true)}
            onMouseOut={() => setIsGeminiTooltipDisplayed(false)}
            onContextMenu={() =>
              setIsGeminiResponsePaused(!isGeminiResponsePaused)
            }
          >
            {!!history && history.length === 0
              ? 'Let Gemini take the lead'
              : 'Now Gemini talks'}
          </button>
          {isGeminiTooltipDisplayed && (
            <div className='tooltip'>
              Right click to {isGeminiResponsePaused ? 'unpause' : 'pause'}{' '}
              Gemini
            </div>
          )}
        </div>
      </div>
      <form className='form' onSubmit={e => sendMessage(e)}>
        <textarea
          value={messageUser}
          onChange={e => setMessageUser(e.target.value)}
          className='textarea'
          ref={textareaRef}
        ></textarea>
        <button type='submit' className='btn send'>
          Send
        </button>
      </form>
      <div className='chat-box'>
        {!!history &&
          history.length !== 0 &&
          history.map((chat, index) => (
            <div className='chat' key={index}>
              <p className='chat-label'>
                {chat.role === 'user' ? 'User:' : 'Gemini:'}
              </p>
              <p className='chat-text'>{chat.parts[0].text}</p>
            </div>
          ))}
      </div>
    </main>
  )
}

export default App
