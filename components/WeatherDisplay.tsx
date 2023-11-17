"use client";

import { useLocationContext } from "./context/LocationContext";
import { useLoadingContext } from "./context/LoadingContext";
import { useEffect, useState } from "react";
import { WeatherResponseBody, Weather } from "@/types/backend";
import LocationForm from "./LocationForm";
import NewLocation from "./NewLocation";

function weatherStatement(code: number, temp: number): string {
  temp = Math.round(temp);
  console.log('Weather code', code)
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
  const [ editLocationBGOpen, setEditLocationBGOpen ] = useState<boolean>(false);
  const [ editLocationOpen, setEditLocationOpen ] = useState<boolean>(false);
  const [ bgColor, setBgColor ] = useState<string>('bg-gray-400');
  const [ textColor, setTextColor ] = useState<string>('text-black');
  
  const { latitude, longitude, city, updateLocation } = useLocationContext();
  const { isLoading, updateLoading } = useLoadingContext();

  // on page load, read latitude and longitude from localStorage, if exists
  useEffect(() => {
    updateLoading(true);
    const latitude: string | null = localStorage.getItem("latitude");
    const longitude: string | null = localStorage.getItem("longitude");
    const city: string | null = localStorage.getItem("city");
    if (latitude && longitude && city) {
      console.log("Setting latitude and longitude from localStorage");
      updateLocation(parseFloat(latitude), parseFloat(longitude), city);
    } else {
      updateLoading(false);
    }
  }, []);

  // when latitude or longitude changes, set the weathercondition to the result of it
  useEffect(() => {
    async function getWeatherCondition(): Promise<void> {
      updateLoading(true);
      if (latitude === null || longitude === null) {
        console.log(
          "Latitude or longitude is null, not updating weather conditions",
        );
        updateLoading(false);
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
          let newBgColor: string;
          let newTextColor: string;
          setTemperature(weather.main.temp);
          setWeatherCode(weather.weather[0].id);
          let code = weather.weather[0].id;
          console.log('Weather code: ', weatherCode)

          if (weather.dt < weather.sys.sunrise || weather.dt > weather.sys.sunset) {
            newBgColor = "bg-night";
            newTextColor = "text-white";
          } else {
            if (200 <= code && code < 300) {
              newBgColor = "bg-storm";
              newTextColor = "text-white";
            } else if (300 <= code && code < 400) {
              newBgColor = "bg-rainy";
              newTextColor = "text-white";
            } else if (500 <= code && code < 600) {
              newBgColor = "bg-rainy";
              newTextColor = "text-white";
            } else if (600 <= code && code < 700) {
              newBgColor = "bg-snow";
              newTextColor = "text-black";
            } else if (700 <= code && code < 800) {
              newBgColor = "bg-foggy";
              newTextColor = "text-white";
            } else if (code <= 802) {
              newBgColor = "bg-sunny";
              newTextColor = "text-black";
            } else if (802 < code && code <= 804) {
              newBgColor = "bg-cloudy";
              newTextColor = "text-white";
            } else {
              newBgColor = "bg-gray-400";
              newTextColor = "text-black";
            }
          }
          setBgColor(newBgColor);
          setTextColor(newTextColor);
          setEditLocationOpen(false);
          setTimeout(() => {
            setEditLocationBGOpen(false);
          }, 100)
          console.log('Set weather conditions');
        }
      }
      console.log('loading off')
      updateLoading(false);
    }
    getWeatherCondition();
  }, [latitude, longitude]);

  const openLocationButton = () => {
    setEditLocationBGOpen(true);
    setTimeout(() => {
      setEditLocationOpen(true);
    }, 10)
  }

  const closeLocationButton = (event: React.MouseEvent) => {
    if (!!!(event.target as HTMLButtonElement).closest('#editLocation')) {
      setEditLocationOpen(false);
      setTimeout(() => {
        setEditLocationBGOpen(false);
      }, 100)
    }
  }

  return (
    <>
      {
        isLoading ? (
          <div className="fixed top-0 left-0 z-50 h-screen w-screen flex items-center justify-center bg-gray-400">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
          </div>
        ) : (
          <>
            {latitude === null && longitude === null ? (
              <>
                <NewLocation />
              </>
            ) : (
              <>
                <div className={`h-screen ${bgColor} ${textColor} flex flex-col items-center justify-center`}>
                  <div className="w-3/5 text-center text-8xl font-bold">
                    {weatherStatement(weatherCode, temperature)}
                  </div>
                </div>

                {editLocationBGOpen && (
                  <div className={`fixed bottom-0 z-10 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm`} onClick={ closeLocationButton }>
                    <div id='editLocation' className={`${editLocationOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform absolute bottom-0 w-full flex flex-col items-center justify-center bg-gray-600 text-white`}>
                      <div className="text-lg mt-10 mb-3">Change your location:</div>
                      <LocationForm />
                    </div>
                  </div>
                )}

                <footer className={`${textColor} fixed bottom-0 mb-12 flex w-full flex-col items-center justify-center`}>
                  <div className="text-lg">Current: {city}</div>
                  <button type="button" className="text-sm underline" onClick={ openLocationButton }>
                    Edit location
                  </button>
                </footer>
              </>
            )}
          </>
        )
      }
    </>
  );
}
