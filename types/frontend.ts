export interface LocationContextProps {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  updateLocation: (latitude: number, longitude: number, city?: string) => void;
}


export interface LoadingContextProps {
  isLoading: boolean;
  updateLoading: (isLoading: boolean) => void;
}