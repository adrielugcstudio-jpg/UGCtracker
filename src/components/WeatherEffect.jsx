import { useMemo } from 'react';

function RainDrops() {
  const drops = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.6 + Math.random() * 0.6,
    opacity: 0.3 + Math.random() * 0.5,
    height: 12 + Math.random() * 14,
  })), []);

  return (
    <div className="weather-layer">
      {drops.map(d => (
        <span
          key={d.id}
          className="raindrop"
          style={{
            left: `${d.left}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            opacity: d.opacity,
            height: `${d.height}px`,
          }}
        />
      ))}
    </div>
  );
}

function Snowflakes() {
  const flakes = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
    size: 4 + Math.random() * 8,
    opacity: 0.4 + Math.random() * 0.5,
    drift: (Math.random() - 0.5) * 60,
  })), []);

  return (
    <div className="weather-layer">
      {flakes.map(f => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            '--drift': `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function SunRays() {
  const rays = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
  })), []);

  return (
    <div className="weather-layer sun-layer">
      <div className="sun">
        <div className="sun-core" />
        {rays.map(r => (
          <div key={r.id} className="sun-ray" style={{ transform: `rotate(${r.angle}deg)` }} />
        ))}
      </div>
    </div>
  );
}

export default function WeatherEffect({ condition }) {
  if (condition === 'rain') return <RainDrops />;
  if (condition === 'snow') return <Snowflakes />;
  if (condition === 'sunny') return <SunRays />;
  return null;
}
