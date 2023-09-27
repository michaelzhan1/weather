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


export interface WeatherRequestBody {
  latitude: number;
  longitude: number;
}


export interface WeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}


export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherConditions[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: string;
}