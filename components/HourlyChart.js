"use client";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function HourlyChart({ hourly }) {
  if (!hourly || hourly.length === 0) return null;

  const labels = hourly.map(h => {
    const date = new Date(h.dt * 1000);
    return date.getHours() + ':00';
  });
  const temps = hourly.map(h => h.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temp (°C)',
        data: temps,
        borderColor: 'rgba(59,130,246,1)',
        backgroundColor: 'rgba(59,130,246,0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: false },
      tooltip: { mode: 'index', intersect: false },
      legend: { labels: { color: '#fff' } }
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
    },
  };

  return (
    <div className="bg-gray-900 p-4 rounded shadow">
      <Line data={data} options={options} />
    </div>
  );
}
