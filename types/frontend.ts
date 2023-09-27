export interface LocationContextProps {
  latitude: number | null;
  longitude: number | null;
  updateLocation: (latitude: number, longitude: number) => void;
}