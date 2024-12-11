"use client";
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function DailyPage() {
  const { weather, locationName } = useContext(WeatherContext);

  if (!weather) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">No Forecast Data</h1>
          <p>Please go back to the <Link href="/" className="text-blue-400 underline">home page</Link> and search for a location first.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-6">7-Day Forecast for {locationName}</h1>
        <div className="max-w-3xl w-full space-y-4">
          <div className="flex space-x-4 overflow-x-auto py-2">
            {weather.daily.slice(0,7).map((d) => {
              const date = new Date(d.dt * 1000);
              return (
                <div
                  key={d.dt}
                  className="min-w-[120px] bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-lg shadow hover:scale-105 transition-transform flex-shrink-0"
                >
                  <div className="text-sm font-medium mb-2">{date.toLocaleDateString(undefined, {weekday:'short', month:'short', day:'numeric'})}</div>
                  <div className="flex flex-col items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                      alt="icon"
                      className="w-10 h-10 mb-1"
                    />
                    <div className="text-lg font-bold">{Math.round(d.temp.day)}°C</div>
                    <div className="text-xs capitalize opacity-80">{d.weather[0].description}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <Link href="/" className="text-blue-400 underline hover:text-blue-500 transition-colors">Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
