"use client";
export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">WeatherView</h1>
      <span className="text-sm opacity-80">OpenWeather Powered</span>
    </nav>
  );
}
