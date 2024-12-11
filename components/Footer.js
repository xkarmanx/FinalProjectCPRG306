"use client";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center text-sm">
      © {new Date().getFullYear()} WeatherView. Powered by OpenWeather.
    </footer>
  );
}
