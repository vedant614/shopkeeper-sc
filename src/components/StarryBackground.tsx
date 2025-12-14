import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

export const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 80;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-foreground/80 dark:bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px hsl(var(--primary) / 0.3)`,
          }}
        />
      ))}

      {/* Shooting stars - occasional */}
      <div className="shooting-star absolute w-1 h-1 bg-white rounded-full" 
        style={{
          top: '20%',
          left: '80%',
          animation: 'shooting-star 6s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      <div className="shooting-star absolute w-1 h-1 bg-white rounded-full"
        style={{
          top: '40%',
          left: '60%',
          animation: 'shooting-star 8s ease-in-out infinite',
          animationDelay: '5s',
        }}
      />
    </div>
  );
};
