import { GeocodingRequestBody, Geocode } from "@/types/backend";


export async function POST(request: Request) {
  const body: GeocodingRequestBody = await request.json();
  const { city, state, country } = body;

  const searchParams: URLSearchParams = new URLSearchParams({
    'city': city,
    'country': country
  });

  if (state) {
    searchParams.append('state', state);
  }

  const res: Response = await fetch('https://api.api-ninjas.com/v1/geocoding?' + searchParams, {
    headers: {
      'X-Api-Key': process.env.APININJA_KEY as string,
    }
  });
  if (!res.ok) {
    console.log('An error occured while looking up location data')
    return new Response(JSON.stringify({ result: null, message: 'An error occured while looking up location data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {
    const data: Geocode[] = await res.json();
    return new Response(JSON.stringify({ result: data, message: 'Success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}