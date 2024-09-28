const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`)
})

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt
  const response = await genAI.generateText(prompt)
  res.send(response)
})
