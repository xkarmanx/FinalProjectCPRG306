import { NextResponse } from 'next/server';

export async function POST(request) {
  const { query } = await request.json();
  if (!query) {
    return NextResponse.json({ error: 'No query provided' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  // Geocode
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${apiKey}`;
  const geoResp = await fetch(geoUrl);
  if (!geoResp.ok) {
    return NextResponse.json({ error: 'Geocoding failed' }, { status: 500 });
  }
  const geoData = await geoResp.json();
  if (geoData.length === 0) {
    return NextResponse.json({ error: 'Location not found' }, { status: 404 });
  }

  const { lat, lon, name, country, state } = geoData[0];

  // Weather data
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const weatherResp = await fetch(weatherUrl);
  if (!weatherResp.ok) {
    return NextResponse.json({ error: 'Weather data fetch failed' }, { status: 500 });
  }
  const weatherData = await weatherResp.json();

  return NextResponse.json({
    locationName: `${name}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`,
    ...weatherData,
  });
}
