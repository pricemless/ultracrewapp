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

  const filtered = listings.filter(l =>
    l.race_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Pacer Finder</h2>
      <p style={{ color: '#aaa' }}>Find a pacer or offer to pace at an upcoming race.</p>

      <div style={{ background: '#111', border: '1px solid #444', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
        <h3>Post a Listing</h3>
        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '6px' }}>
          <option value="needed">I need a pacer</option>
          <option value="available">I am available to pace</option>
        </select>
        {['race_name', 'race_date', 'miles_start', 'miles_end', 'experience', 'contact', 'notes'].map(field => (
          <input key={field} placeholder={field.replace('_', ' ')}
            value={form[field]}
            onChange={e => setForm({...form, [field]: e.target.value})}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        ))}
        <button onClick={handleSubmit}
          style={{ width: '100%', padding: '12px', background: '#f90', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Post Listing
        </button>
      </div>

      <input placeholder="Search by race name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '6px', boxSizing: 'border-box' }}
      />

      {filtered.map(listing => (
        <div key={listing.id} style={{
          padding: '15px', margin: '10px 0',
          background: '#111', border: `1px solid ${listing.type === 'needed' ? '#f90' : '#0af'}`,
          borderRadius: '8px'
        }}>
          <span style={{ color: listing.type === 'needed' ? '#f90' : '#0af', fontWeight: 'bold' }}>
            {listing.type === 'needed' ? '🏃 NEEDS PACER' : '⚡ AVAILABLE TO PACE'}
          </span>
          <br/><strong>{listing.race_name}</strong> — {listing.race_date}<br/>
          <span style={{ color: '#aaa' }}>Miles {listing.miles_start}–{listing.miles_end}</span><br/>
          <span style={{ color: '#aaa' }}>{listing.experience}</span><br/>
          <span style={{ color: '#0af' }}>Contact: {listing.contact}</span><br/>
          {listing.notes && <span style={{ color: '#888' }}>{listing.notes}</span>}
        </div>
      ))}
    </div>
  )
}

export default Pacers