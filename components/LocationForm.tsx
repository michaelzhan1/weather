'use client'


import { useState } from 'react';
import { GeocodeResponseBody } from '@/types/backend';
import { useLocationContext } from './context/LocationContext';


export default function LocationForm () {
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  
  const { latitude, longitude, updateLocation } = useLocationContext();

  async function getCoords (event: React.FormEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
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
        updateLocation(data.result[0].latitude, data.result[0].longitude, data.result[0].name)
        localStorage.setItem('latitude', data.result[0].latitude.toString())
        localStorage.setItem('longitude', data.result[0].longitude.toString())
        localStorage.setItem('city', data.result[0].name)
        console.log('Set coordinates')
      }
    }
  }

  return (
    <>
      <form className='flex flex-col mb-5 justify-center items-center text-center'>
        <label htmlFor='city'>City</label>
        <input name="city" type='text' className='text-black' value={city} onChange={e => setCity(e.target.value)} required />
        <label htmlFor='state'>State</label>
        <input name='state' type='text' className='text-black' value={state} onChange={e => setState(e.target.value)} />
        <label htmlFor='country'>Country</label>
        <input name="country" type='text' className='text-black' value={country} onChange={e => setCountry(e.target.value)} required />
        <button type='submit' onClick={getCoords}>Change</button>
      </form>
    </>
  )
}