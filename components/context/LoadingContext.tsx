'use client'


import { useContext, createContext, useState, ReactNode } from 'react'
import { LoadingContextProps } from '@/types/frontend';


const LoadingContext = createContext<LoadingContextProps>({ isLoading: false, updateLoading: (isLoading) => null});

export function useLoadingContext() {
  return useContext(LoadingContext)
}

export function LoadingContextProvider({children}: {children: ReactNode}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
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