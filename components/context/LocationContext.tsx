'use client'


import { useContext, createContext, useState, ReactNode } from 'react'
import { LocationContextProps } from '@/types/frontend';


const LocationContext = createContext<LocationContextProps>({ latitude: null, longitude: null, updateLocation: (latitude, longitude) => null } );

export function useLocationContext() {
  return useContext(LocationContext)
}

export function LocationContextProvider({children}: {children: ReactNode}) {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)

  const updateLocation = (latitude: number, longitude: number) => {
    console.log('Updating location')
    setLatitude(latitude)
    setLongitude(longitude)
  }

  const contextData = {
    latitude,
    longitude,
    updateLocation
  };

  return (
    <LocationContext.Provider value={contextData}>
      {children}
    </LocationContext.Provider>
  )
}