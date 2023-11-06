'use client'


import { useState } from 'react';
import { GeocodeResponseBody } from '@/types/backend';
import { useLocationContext } from './context/LocationContext';


export default function LocationForm () {
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  
  const { latitude, longitude, updateLocation } = useLocationContext();

  async function getCoords (): Promise<void> {
    await fetch(`/api/coords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: state ? JSON.stringify({ city, state, country }) : JSON.stringify({ city, country })
    })
    const res: Response = await fetch(`/api/coords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: state ? JSON.stringify({ city, state, country }) : JSON.stringify({ city, country })
    })
    if (!res.ok) {
      alert(`Error while finding data for ${city}, ${state}, ${country}`)
    } else {
      const data: GeocodeResponseBody = await res.json()
      if (!data.result || data.result.length === 0) {
        alert(`No data found for ${city}, ${state}, ${country}. Maybe check spelling?`)
        console.error(`No data found for ${city}, ${state}, ${country}`)
      } else {
        updateLocation(data.result[0].latitude, data.result[0].longitude)
        alert(`Coordinates for ${city}, ${state}, ${country} are ${data.result[0].latitude}, ${data.result[0].longitude}`)
        console.log('Set coordinates')
      }
    }
  }

  return (
    <>
      <div>Locations: {city}, {country}</div>
      <form>
        <label htmlFor='city'>City</label>
        <input name="city" type='text' value={city} onChange={e => setCity(e.target.value)} required />
        <label htmlFor='state'>State</label>
        <input name='state' type='text' value={state} onChange={e => setState(e.target.value)} />
        <label htmlFor='country'>Country</label>
        <input name="country" type='text' value={country} onChange={e => setCountry(e.target.value)} required />
        <button type='button' onClick={() => console.log(city, country)}>Submit</button>
      </form>
      <button type='button' onClick={getCoords}>Click here for coordinates!</button>
      <div>Coordinates: {latitude}, {longitude}</div>
    </>
  )
}