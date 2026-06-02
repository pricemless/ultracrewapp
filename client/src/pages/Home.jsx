import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
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
    <div className="page">
      <div className="page-header">
        <h1>Race Dashboard</h1>
        <p>Select a race to view aid stations and crew notes</p>
      </div>

      {races.map(race => (
        <div
          key={race.id}
          className={`card ${selectedRace?.id === race.id ? 'active' : ''}`}
          onClick={() => selectRace(race)}
        >
          <div className="card-title">{race.name}</div>
          <div className="card-meta">{race.distance} miles</div>
        </div>
      ))}

      {selectedRace && (
        <>
          <hr className="divider" />
          <div className="page-header">
            <h2>{selectedRace.name} — Aid Stations</h2>
            <p>{stations.length} stations · {selectedRace.distance} miles total</p>
          </div>

          {stations.length === 0 && (
            <div className="empty-state">
              <h3>No Stations Yet</h3>
              <p>Add aid stations to this race</p>
            </div>
          )}

          {stations.map(station => (
            <div key={station.id} className="station-card">
              <div className="station-mile">
                {station.distance}
                <span>MILE</span>
              </div>
              <div>
                <div className="station-name">{station.name}</div>
                <div className="station-cutoff">⏱ {station.cutoff_time}</div>
              </div>
              <div className="station-notes">{station.crew_notes}</div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Home