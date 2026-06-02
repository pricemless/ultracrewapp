import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [races, setRaces] = useState([])
  const [selectedRace, setSelectedRace] = useState(null)
  const [stations, setStations] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/races')
      .then(res => setRaces(res.data))
      .catch(err => console.error(err))
  }, [])

  function selectRace(race) {
    setSelectedRace(race)
    axios.get(`http://localhost:3000/race/${race.id}/stations`)
      .then(res => setStations(res.data.stations))
      .catch(err => console.error(err))
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>UltraCrew</h1>
      <p>Race Day Command Center</p>

      <h2>Races</h2>
      {races.map(race => (
        <div key={race.id} onClick={() => selectRace(race)} style={{
          padding: '15px',
          margin: '10px 0',
          background: selectedRace?.id === race.id ? '#333' : '#111',
          border: '1px solid #444',
          cursor: 'pointer',
          borderRadius: '8px'
        }}>
          <strong>{race.name}</strong> — {race.distance} miles
        </div>
      ))}

      {selectedRace && (
        <div>
          <h2>{selectedRace.name} — Aid Stations</h2>
          {stations.map(station => (
            <div key={station.id} style={{
              padding: '15px',
              margin: '10px 0',
              background: '#111',
              border: '1px solid #444',
              borderRadius: '8px'
            }}>
              <strong>{station.name}</strong> — Mile {station.distance}<br/>
              <span style={{ color: '#f90' }}>Cutoff: {station.cutoff_time}</span><br/>
              <span style={{ color: '#aaa' }}>Crew: {station.crew_notes}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App