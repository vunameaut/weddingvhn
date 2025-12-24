import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(40px)';
      case 'right': return 'translateX(-40px)';
      case 'none': return 'none';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getTransform(),
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};
