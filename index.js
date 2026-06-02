const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const raceRoutes = require('./routes/race')
app.use('/', raceRoutes)

app.get('/', (req, res) => {
  res.send('UltraCrew is alive!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})