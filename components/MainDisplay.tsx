import LocationForm from "./LocationForm"
import WeatherDisplay from "./WeatherDisplay"
import { LocationContextProvider } from "./LocationContext"


export default function MainDisplay () {
  return (
    <>
      <LocationContextProvider>
        <WeatherDisplay />
        <LocationForm />
      </LocationContextProvider>
    </>
  )
}