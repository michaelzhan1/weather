'use client'


import { useLocationContext } from "./context/LocationContext"
import { useEffect, useState } from "react";
import { WeatherResponseBody, Weather } from "@/types/backend";
import LocationForm from "./LocationForm";

export default function WeatherDisplay() {
  const [ weatherCondition, setWeatherCondition ] = useState<string>('');
  const { latitude, longitude } = useLocationContext();

  // when latitude or longitude changes, set the weathercondition to the result of it
  useEffect(() => {
    async function getWeatherCondition(): Promise<void> {
      if (latitude === null || longitude === null) {
        console.log('Latitude or longitude is null, not updating weather conditions')
        return
      }
      console.log('Updating weather conditions')
      const res: Response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`)
      if (!res.ok) {
        alert(`Error while finding weather data for ${latitude}, ${longitude}`)
      } else {
        const data: WeatherResponseBody = await res.json();
        if (!data.result) {
          alert(`No data found for ${latitude}, ${longitude}.`)
          console.error(`No data found for ${latitude}, ${longitude}`)
        } else {
          const weather: Weather = data.result;
          setWeatherCondition(weather.weather[0].description)
        }
      }
    }
    getWeatherCondition()
  }, [latitude, longitude])

  return (
    <>
      {(latitude === null) && (longitude === null) ? (
        <>
          <div>No location set</div>
          <LocationForm />
        </>
      ) : (
        <>
          <div>Latitude: {latitude}</div>
          <div>Longitude: {longitude}</div>
        </>
      )}
      <div>
        Current weather condition: {weatherCondition}
      </div>
    </>
  )
}