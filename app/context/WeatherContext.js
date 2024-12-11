"use client";
import { createContext, useState } from 'react';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [timezone, setTimezone] = useState(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather, locationName, setLocationName, timezone, setTimezone }}>
      {children}
    </WeatherContext.Provider>
  );
}
