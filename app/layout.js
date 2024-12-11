import './globals.css'
import { WeatherProvider } from './context/WeatherContext'

export const metadata = {
  title: 'WeatherView',
  description: 'Your Window to THe Skies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WeatherProvider>
          {children}
        </WeatherProvider>
      </body>
    </html>
  )
}
