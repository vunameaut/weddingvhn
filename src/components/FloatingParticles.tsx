import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: 'heart' | 'petal' | 'sparkle';
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      
      // Hearts
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 15,
          duration: 10 + Math.random() * 8,
          size: 12 + Math.random() * 12,
          type: 'heart',
        });
      }
      
      // Petals
      for (let i = 8; i < 18; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 20,
          duration: 12 + Math.random() * 10,
          size: 10 + Math.random() * 10,
          type: 'petal',
        });
      }
      
      // Sparkles
      for (let i = 18; i < 25; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 8 + Math.random() * 6,
          size: 4 + Math.random() * 6,
          type: 'sparkle',
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const renderParticle = (particle: Particle) => {
    switch (particle.type) {
      case 'heart':
        return <span className="text-wedding-pink opacity-60">♥</span>;
      case 'petal':
        return <span className="text-wedding-rose opacity-50">❀</span>;
      case 'sparkle':
        return <span className="text-wedding-gold opacity-70">✦</span>;
      default:
        return null;
    }
  };

  const getAnimation = (type: string) => {
    switch (type) {
      case 'heart':
        return 'animate-heart-float';
      case 'petal':
        return 'animate-petal-fall';
      case 'sparkle':
        return 'animate-sparkle animate-float';
      default:
        return 'animate-float';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${getAnimation(particle.type)}`}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            fontSize: `${particle.size}px`,
          }}
        >
          {renderParticle(particle)}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
