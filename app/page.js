"use client";
import { useState, useContext } from 'react';
import { WeatherContext } from './context/WeatherContext';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import LoadingSpinner from '../components/LoadingSpinner';
import ErrorComponent from '../components/ErrorComponent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WeatherSummary from '../components/WeatherSummary';

const HourlyChart = dynamic(() => import('../components/HourlyChart'), { ssr: false });

export default function Page() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { weather, setWeather, setLocationName, setTimezone, locationName, timezone } = useContext(WeatherContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch weather');
      }
      setWeather(data);
      setLocationName(data.locationName);
      setTimezone(data.timezone);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-6 tracking-wide">WeatherView</h1>
        <h2 className="text-m font-semibold mb-4">Your window to the skies.</h2>
        <form onSubmit={handleSearch} className="mb-6 w-full max-w-md flex space-x-2">
          <input
            type="text"
            placeholder="Enter city or zip"
            className="flex-grow p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Search
          </button>
        </form>

        {loading && <LoadingSpinner />}
        {error && <ErrorComponent message={error} />}

        {weather && (
          <div className="max-w-md w-full space-y-6">
            <WeatherSummary locationName={locationName} timezone={timezone} weather={weather} />

            {/* Hourly chart */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Hourly Forecast</h3>
              <HourlyChart hourly={weather.hourly.slice(0,24)} />
            </div>

            {/* Link to daily page for 7-day forecast */}
            <div className="text-center">
              <Link href="/daily">
                <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-4">
                  View 7-Day Forecast
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
