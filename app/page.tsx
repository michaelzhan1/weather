import WeatherDisplay from "@/components/WeatherDisplay"
import { LocationContextProvider } from "@/components/context/LocationContext"
import { LoadingContextProvider } from "@/components/context/LoadingContext"


export default function Home() {
  return(
    <>
      <LoadingContextProvider>
        <LocationContextProvider>
          <WeatherDisplay />
        </LocationContextProvider>
      </LoadingContextProvider>
    </>
  )
}
