"use client";
export default function WeatherSummary({ locationName, timezone, weather }) {
  return (
    <div className="bg-gray-900 p-4 rounded shadow space-y-2">
      <h2 className="text-2xl font-bold">{locationName}</h2>
      <p className="opacity-80">{timezone}</p>
      <div className="flex items-center space-x-2">
        <img
          src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
          alt="icon"
          className="w-10 h-10"
        />
        <div>
          <div className="text-xl font-semibold">{Math.round(weather.current.temp)}°C</div>
          <div className="capitalize">{weather.current.weather[0].description}</div>
        </div>
      </div>
    </div>
  );
}
