import { useState, useEffect } from 'react';

// WMO weather code → condition
function parseCondition(code) {
  if (code === 0 || code === 1) return 'sunny';
  if (code >= 2 && code <= 3) return 'cloudy';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
  if (code >= 95) return 'rain';
  return 'cloudy';
}

export function useWeather() {
  const [weather, setWeather] = useState({ condition: 'sunny', isDay: true, loading: true, error: null });

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&current=weather_code,is_day&timezone=America%2FVancouver'
    )
      .then(r => r.json())
      .then(data => {
        const code = data.current.weather_code;
        const isDay = data.current.is_day === 1;
        setWeather({ condition: parseCondition(code), isDay, loading: false, error: null });
      })
      .catch(() => {
        setWeather(w => ({ ...w, loading: false, error: 'Could not load weather' }));
      });
  }, []);

  return weather;
}
