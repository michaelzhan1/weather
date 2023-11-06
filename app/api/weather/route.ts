import { Weather, WeatherRequestBody } from '@/types/backend'
import { type NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  const inputSearchParams: URLSearchParams = request.nextUrl.searchParams;
  const latitude = inputSearchParams.get('latitude');
  const longitude = inputSearchParams.get('longitude');

  if (!latitude || !longitude) {
    return new Response(JSON.stringify({ result: null, message: 'Invalid latitude or longitude' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const searchParams: URLSearchParams = new URLSearchParams({
    'lat': latitude.toString(),
    'lon': longitude.toString(),
    'appid': process.env.APIWEATHER_KEY as string,
    'units': 'imperial',
  });

  const res: Response = await fetch('https://api.openweathermap.org/data/2.5/weather?' + searchParams);
  if (!res.ok) {
    console.error('An error occured while looking up weather data')
    return new Response(JSON.stringify({ result: null, message: 'An error occured while looking up weather data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {
    const data: Weather = await res.json();
    return new Response(JSON.stringify({ result: data, message: 'Success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}