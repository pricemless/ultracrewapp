const express = require('express')
const router = express.Router()
const db = require('../database/db')

// Get all pacer listings
router.get('/pacers', (req, res) => {
  const pacers = db.prepare('SELECT * FROM pacers ORDER BY created_at DESC').all()
  res.json(pacers)
})

// Get pacers for a specific race
router.get('/pacers/race/:race_name', (req, res) => {
  const pacers = db.prepare(
    'SELECT * FROM pacers WHERE race_name LIKE ? ORDER BY type ASC'
  ).all(`%${req.params.race_name}%`)
  res.json(pacers)
})

// Post a pacer listing
router.post('/pacers', (req, res) => {
  const { type, race_name, race_date, miles_start, miles_end, experience, contact, notes } = req.body

  if (!type || !race_name || !contact) {
    return res.status(400).json({ error: 'Type, race name, and contact are required' })
  }

  if (type !== 'needed' && type !== 'available') {
    return res.status(400).json({ error: 'Type must be needed or available' })
  }

  const stmt = db.prepare(`
    INSERT INTO pacers (type, race_name, race_date, miles_start, miles_end, experience, contact, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(type, race_name, race_date, miles_start, miles_end, experience, contact, notes)

  res.json({ message: 'Listing created', id: result.lastInsertRowid })
})

// Delete a listing
router.delete('/pacers/:id', (req, res) => {
  const result = db.prepare('DELETE FROM pacers WHERE id = ?').run(req.params.id)
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Listing not found' })
  }
  res.json({ message: 'Listing deleted' })
})

module.exports = router