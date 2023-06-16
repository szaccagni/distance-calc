
import './App.css';
import Map from '../Map/Map';
import { useState } from 'react'
import Button from '@mui/material/Button';
import { calculateDistance } from '../helper';
import Result from '../Result/Result';

export default function App() {
  const [location1, setlocation1] = useState('')
  const [location2, setlocation2] = useState('')
  const [manualMarker1, setManualMarker1] = useState('')
  const [manualMarker2, setManualMarker2] = useState('')
  const [error, setError] = useState('')
  const [distance, setDistance] = useState('')
  const [pageStyle, setPageStyle] = useState({})

  function handleClick() {
    const result = calculateDistance(location1, location2)
    setDistance(result)
    setPageStyle({opacity: '.5'})
  }

  function resetPg() {
    setlocation1('')
    setlocation2('')
    setManualMarker1('')
    setManualMarker2('')
    setError('')
    setDistance('')
    setPageStyle({})
  }

  return (
    <main className="App">
      <div>
        <div className='title'>Select two locations on the map</div>
        <div className='instructions'>INSTRUCTIONS: 
          <ul>
            <li>You can click on the map to populate your locations</li>
            <li>Alternately, you can manually enter your <strong>coordniates</strong> formatted LONGITUDE,LATITUDE in the fields below, make sure to hit enter once you are done typing the coordniates to see your marker on the map (ex: -122.431297, 37.773972) </li>
            <li>Finally, you can clear locations by clicking the marker</li>
          </ul>
        </div>
        <Map manualMarker1={manualMarker1} setManualMarker1={setManualMarker1} manualMarker2={manualMarker2} setManualMarker2={setManualMarker2} setlocation1={setlocation1} location2={location2} setlocation2={setlocation2} setError={setError} pageStyle={pageStyle}/>
      </div>
      {error && <div className='error-msg'>{error}</div>}
      {location1 && location2 && 
        <Button className='calc-btn' variant="contained" onClick={handleClick}>CALCULATE DISTANCE</Button>
      }
      {distance && <Button className='calc-btn' variant="contained" style={{marginLeft: '25px'}} onClick={resetPg}>Reset</Button>}
      <div className='info-container grid-container'>
        <div className='location-container'>
          <div>location 1: </div>
          <input 
            value={location1} 
            onChange={(e) => setlocation1(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setManualMarker1(e.target.value)}
          ></input>
        </div>
        <div className='location-container'>
          <div>location 2: </div>
          <input 
            value={location2} 
            onChange={(e) => setlocation2(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setManualMarker2(e.target.value)}
          ></input>
        </div>
      </div>
      {distance && <Result result={distance} />}
    </main>
  );
}