export interface LocationContextProps {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  updateLocation: (latitude: number, longitude: number, city?: string) => void;
}