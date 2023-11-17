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
      <form className='flex flex-col mb-4 justify-center items-center text-center'>
        <div className="flex-row flex mb-5">
          <div className="flex-col flex mx-5">
            <label htmlFor='city' className='mb-1'>City</label>
            <input name="city" type='text' className='text-black mb-2 w-40 px-2 py-1' value={city} onChange={e => setCity(e.target.value)} required />
          </div>
          <div className="flex flex-col mx-5">
            <label htmlFor='state' className='mb-1'>State</label>
            <input name='state' type='text' className='text-black mb-2 w-40 px-2 py-1' placeholder='Optional' value={state} onChange={e => setState(e.target.value)} />
          </div>
          <div className="flex flex-col mx-5">
            <label htmlFor='country' className='mb-1'>Country</label>
            <input name="country" type='text' placeholder='e.g. US, UK' className='text-black mb-2 w-40 px-2 py-1' value={country} onChange={e => setCountry(e.target.value)} required />
          </div>
        </div>
        <button type='submit' className='mb-10 bg-gray-700 px-5 py-3 shadow-md hover:-translate-y-1' onClick={getCoords}>Change</button>
      </form>
    </>
  )
}