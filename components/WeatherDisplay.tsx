'use client'


import { useLocationContext } from "./LocationContext"


export default function WeatherDisplay() {
  const { latitude, longitude } = useLocationContext();
  return (
    <>
      {(latitude === null) && (longitude === null) ? (
        <>
          <div>Null values in lat and lon</div>
        </>
      ) : (
        <>
          <div>Latitude: {latitude}</div>
          <div>Longitude: {longitude}</div>
        </>
      )}
    </>
  )
}