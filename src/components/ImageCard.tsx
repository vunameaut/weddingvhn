import { useImageCardAnimation } from '@/hooks/useScrollAnimation';

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const ImageCard = ({ src, alt, className = '', delay = 0 }: ImageCardProps) => {
  const { ref, inView } = useImageCardAnimation();

  return (
    <div
      ref={ref}
      className={`image-card ${inView ? 'in-view' : ''} ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
    >
      <img src={src} alt={alt} loading="lazy" />
      
      {/* Sparkle effects */}
      {inView && (
        <>
          <div className="sparkle" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
          <div className="sparkle" style={{ top: '20%', right: '15%', animationDelay: '0.5s' }} />
          <div className="sparkle" style={{ bottom: '30%', left: '20%', animationDelay: '1s' }} />
          <div className="sparkle" style={{ bottom: '15%', right: '10%', animationDelay: '1.5s' }} />
        </>
      )}
    </div>
  );
};

export default ImageCard;

