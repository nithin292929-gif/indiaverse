import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import toursRouter from './routes/tours.js'
import bookingsRouter from './routes/bookings.js'

dotenv.config()

const app = express()

app.use(cors({ origin: '*', credentials: false }))
app.use(express.json())

app.use('/api/tours', toursRouter)
app.use('/api/bookings', bookingsRouter)

app.get('/', (req, res) => {
  res.json({ message: '🇮🇳 IndiaVerse API is running!' })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on http://localhost:5000`)
})