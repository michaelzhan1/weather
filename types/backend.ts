export interface GeocodingRequestBody {
  city: string;
  state?: string;
  country: string;
}

export interface Geocode {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
}

export interface GeocodeResponseBody {
  result: Geocode[] | null;
  message: string;
}