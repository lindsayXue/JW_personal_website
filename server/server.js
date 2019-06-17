const express = require('express')
const Routes = require('./routes')
const cors = require('cors')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

// Connect to MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Cors
app.use(cors())

app.use('/api', Routes)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log('production mode')
  // set static folder
  app.use(express.static('dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
