const Database = require('better-sqlite3')
const db = new Database('ultracrewapp.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS races (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    distance INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    distance INTEGER NOT NULL,
    cutoff_time TEXT,
    crew_notes TEXT,
    FOREIGN KEY (race_id) REFERENCES races(id)
  )
`)
db.exec(`
  CREATE TABLE IF NOT EXISTS pacers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    race_name TEXT NOT NULL,
    race_date TEXT,
    miles_start INTEGER,
    miles_end INTEGER,
    experience TEXT,
    contact TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)
module.exports = db
