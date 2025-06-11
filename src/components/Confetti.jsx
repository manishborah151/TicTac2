import React, { useEffect, useState } from 'react';
import './Confetti.css';

const Confetti = ({ trigger }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 120 }).map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 300 + Math.random() * 400;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        return {
          id: i,
          dx,
          dy,
          delay: Math.random() * 0.3,
          duration: 1 + Math.random() * 0.8,
          size: 6 + Math.random() * 6,
          rotate: Math.random() * 360,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          fallDuration: 2 + Math.random() * 2,
          fallDelay: 1 + Math.random() * 0.5,
        };
      });

      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="confetti-burst-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-burst-piece"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s, ${p.fallDelay}s`,
            animationDuration: `${p.duration}s, ${p.fallDuration}s`,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
