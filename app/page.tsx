import WeatherDisplay from "@/components/WeatherDisplay"
import { LocationContextProvider } from "@/components/context/LocationContext"


export default function Home() {
  return(
    <>
      <LocationContextProvider>
        <WeatherDisplay />
      </LocationContextProvider>
    </>
  )
}
