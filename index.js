const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const raceRoutes = require('./routes/race')
const pacerRoutes = require('./routes/pacers')

app.use('/', raceRoutes)
app.use('/', pacerRoutes)

app.get('/', (req, res) => {
  res.send('DropBag is alive!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})