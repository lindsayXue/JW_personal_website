const express = require('express')
const Routes = require('./routes')

const app = express()

// Init Middleware
app.use(express.json({ extended: false }))

app.use('/api', Routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
