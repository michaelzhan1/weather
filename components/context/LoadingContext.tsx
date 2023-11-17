'use client'


import { useContext, createContext, useState, ReactNode } from 'react'
import { LoadingContextProps } from '@/types/frontend';


const LoadingContext = createContext<LoadingContextProps>({ isLoading: true, updateLoading: (isLoading) => null});

export function useLoadingContext() {
  return useContext(LoadingContext)
}

export function LoadingContextProvider({children}: {children: ReactNode}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateLoading = (isLoading: boolean) => {
    if (isLoading) {
      setIsLoading(isLoading)
    } else {
      setTimeout(() => {
        setIsLoading(isLoading)
      }, 100)
    }
  }

  const contextData = {
    isLoading,
    updateLoading
  };

  return (
    <LoadingContext.Provider value={contextData}>
      {children}
    </LoadingContext.Provider>
  )
}