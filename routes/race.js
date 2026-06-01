const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.post('/race', (req, res) => {
  const { name, distance } = req.body

  if (!name || !distance) {
    return res.status(400).json({ error: 'Name and distance are required' })
  }

  const stmt = db.prepare('INSERT INTO races (name, distance) VALUES (?, ?)')
  const result = stmt.run(name, distance)

  res.json({ message: 'Race created', id: result.lastInsertRowid })
})

router.get('/race/:id', (req, res) => {
  const race = db.prepare('SELECT * FROM races WHERE id = ?').get(req.params.id)

  if (!race) {
    return res.status(404).json({ error: 'Race not found' })
  }

  res.json(race)
})

module.exports = router