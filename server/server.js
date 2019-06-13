const express = require('express')
const Routes = require('./routes')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

// Connect to MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Cors
app.use(cors())

app.use('/api', Routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
