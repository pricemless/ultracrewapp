import { useState, useEffect } from 'react'
import axios from 'axios'

function Pacers() {
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    type: 'needed',
    race_name: '',
    race_date: '',
    miles_start: '',
    miles_end: '',
    experience: '',
    contact: '',
    notes: ''
  })

  useEffect(() => {
    fetchListings()
  }, [])

  function fetchListings() {
    axios.get('http://localhost:3000/pacers')
      .then(res => setListings(res.data))
      .catch(err => console.error(err))
  }

  function handleSubmit() {
    if (!form.race_name || !form.contact) return
    axios.post('http://localhost:3000/pacers', form)
      .then(() => {
        fetchListings()
        setForm({
          type: 'needed', race_name: '', race_date: '',
          miles_start: '', miles_end: '', experience: '',
          contact: '', notes: ''
        })
      })
      .catch(err => console.error(err))
  }

  function update(field, value) {
    setForm({ ...form, [field]: value })
  }

  const filtered = listings.filter(l =>
    l.race_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div className="page-header">
        <h1>Pacer Finder</h1>
        <p>Find a pacer or offer to pace at an upcoming race</p>
      </div>

      <div className="form-card">
        <h3>Post a Listing</h3>
        <br />

        <div className="form-field">
          <label>I am...</label>
          <select value={form.type} onChange={e => update('type', e.target.value)}>
            <option value="needed">Looking for a pacer</option>
            <option value="available">Available to pace</option>
          </select>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label>Race Name</label>
            <input placeholder="Leadville 100" value={form.race_name}
              onChange={e => update('race_name', e.target.value)} />
          </div>
          <div className="form-field">
            <label>Race Date</label>
            <input placeholder="August 2026" value={form.race_date}
              onChange={e => update('race_date', e.target.value)} />
          </div>
          <div className="form-field">
            <label>Miles Start</label>
            <input placeholder="50" value={form.miles_start}
              onChange={e => update('miles_start', e.target.value)} />
          </div>
          <div className="form-field">
            <label>Miles End</label>
            <input placeholder="100" value={form.miles_end}
              onChange={e => update('miles_end', e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label>Experience</label>
          <input placeholder="Ran Leadville twice, know the course well"
            value={form.experience} onChange={e => update('experience', e.target.value)} />
        </div>
        <div className="form-field">
          <label>Contact</label>
          <input placeholder="email or instagram handle"
            value={form.contact} onChange={e => update('contact', e.target.value)} />
        </div>
        <div className="form-field">
          <label>Notes</label>
          <input placeholder="anything else to know"
            value={form.notes} onChange={e => update('notes', e.target.value)} />
        </div>

        <button className="btn-primary" onClick={handleSubmit}>
          Post Listing
        </button>
      </div>

      <div className="search-bar">
        <input placeholder="Search by race name..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No Listings Found</h3>
          <p>Be the first to post for this race</p>
        </div>
      )}

      {filtered.map(listing => (
        <div key={listing.id} className={`pacer-card ${listing.type}`}>
          <span className={`tag ${listing.type === 'needed' ? 'tag-orange' : 'tag-blue'}`}>
            {listing.type === 'needed' ? '🏃 Needs Pacer' : '⚡ Available to Pace'}
          </span>
          <div className="pacer-race">{listing.race_name}</div>
          <div className="pacer-miles">
            Miles {listing.miles_start}–{listing.miles_end} · {listing.race_date}
          </div>
          {listing.experience && (
            <div className="pacer-miles" style={{ marginTop: '6px' }}>{listing.experience}</div>
          )}
          <div className="pacer-contact">📬 {listing.contact}</div>
          {listing.notes && <div className="pacer-notes">"{listing.notes}"</div>}
        </div>
      ))}
    </div>
  )
}

export default Pacers