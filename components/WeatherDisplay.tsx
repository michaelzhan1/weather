"use client";

import { useLocationContext } from "./context/LocationContext";
import { useEffect, useState } from "react";
import { WeatherResponseBody, Weather } from "@/types/backend";
import LocationForm from "./LocationForm";

function weatherStatement(code: number, temp: number): string {
  temp = Math.round(temp);
  let tempStatement: string = `It is ${temp}\u00B0F and `;
  if (code == 0) {
    return "";
  } else if (200 <= code && code < 300) {
    tempStatement += "thunderstorming outside.";
  } else if (300 <= code && code < 400) {
    tempStatement += "drizzling outside.";
  } else if (500 <= code && code < 600) {
    tempStatement += "raining outside.";
  } else if (600 <= code && code < 700) {
    tempStatement += "snowing outside.";
  } else if (700 <= code && code < 800) {
    tempStatement += "foggy outside.";
  } else if (code == 800) {
    tempStatement += "clear outside.";
  } else if (code <= 802) {
    tempStatement += "partly cloudy outside.";
  } else if (code <= 804) {
    tempStatement += "overcast outside.";
  } else {
    return "";
  }
  return tempStatement;
}

export default function WeatherDisplay() {
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);
  const { latitude, longitude, city, updateLocation } = useLocationContext();

  // on page load, read latitude and longitude from localStorage, if exists
  useEffect(() => {
    const latitude: string | null = localStorage.getItem("latitude");
    const longitude: string | null = localStorage.getItem("longitude");
    const city: string | null = localStorage.getItem("city");
    if (latitude && longitude && city) {
      console.log("Setting latitude and longitude from localStorage");
      updateLocation(parseFloat(latitude), parseFloat(longitude), city);
    }
  });

  // when latitude or longitude changes, set the weathercondition to the result of it
  useEffect(() => {
    async function getWeatherCondition(): Promise<void> {
      if (latitude === null || longitude === null) {
        console.log(
          "Latitude or longitude is null, not updating weather conditions",
        );
        return;
      }
      console.log("Updating weather conditions");
      const res: Response = await fetch(
        `/api/weather?latitude=${latitude}&longitude=${longitude}`,
      );
      if (!res.ok) {
        alert(`Error while finding weather data for ${latitude}, ${longitude}`);
      } else {
        const data: WeatherResponseBody = await res.json();
        if (!data.result) {
          alert(`No data found for ${latitude}, ${longitude}.`);
          console.error(`No data found for ${latitude}, ${longitude}`);
        } else {
          const weather: Weather = data.result;
          setWeatherCode(weather.weather[0].id);
          setTemperature(weather.main.temp);
        }
      }
    }
    getWeatherCondition();
  }, [latitude, longitude]);

  let bgColor: string;
  let textColor: string;
  if (200 <= weatherCode && weatherCode < 300) {
    bgColor = "bg-storm";
    textColor = "text-white";
  } else if (300 <= weatherCode && weatherCode < 400) {
    bgColor = "bg-rainy";
    textColor = "text-white";
  } else if (500 <= weatherCode && weatherCode < 600) {
    bgColor = "bg-rainy";
    textColor = "text-white";
  } else if (600 <= weatherCode && weatherCode < 700) {
    bgColor = "bg-snow";
    textColor = "text-black";
  } else if (700 <= weatherCode && weatherCode < 800) {
    bgColor = "bg-foggy";
    textColor = "text-white";
  } else if (weatherCode <= 802) {
    bgColor = "bg-sunny";
    textColor = "text-black";
  } else if (weatherCode <= 804) {
    bgColor = "bg-cloudy";
    textColor = "text-white";
  } else {
    bgColor = "bg-gray-400";
    textColor = "text-black";
  }

  return (
    <>
      {latitude === null && longitude === null ? (
        <>
          <div>No location set</div>
          <LocationForm />
        </>
      ) : (
        <>
          <div className={`h-screen ${bgColor} ${textColor} flex flex-col items-center justify-center`}>
            <div className="w-3/5 text-center text-8xl font-bold">
              {weatherStatement(weatherCode, temperature)}
            </div>
          </div>

          <div className="absolute bottom-0 z-10 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center bg-gray-800 text-white">
              <div className="text-lg">Change location:</div>
              <LocationForm />
            </div>
          </div>

          <footer className={`${textColor} fixed bottom-0 mb-12 flex w-full flex-col items-center justify-center`}>
            <div className="text-lg">Current: {city}</div>
            <button type="button" className="text-sm underline">
              Edit location
            </button>
          </footer>
        </>
      )}
    </>
  );
}
