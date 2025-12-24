import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
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

type AnimationDirection = 'left' | 'right' | 'up' | 'down' | 'fade' | 'scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  threshold = 0.15,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

  const getInitialStyles = useCallback(() => {
    const baseOpacity = 0;
    switch (direction) {
      case 'left':
        return { opacity: baseOpacity, transform: 'translateX(-60px)' };
      case 'right':
        return { opacity: baseOpacity, transform: 'translateX(60px)' };
      case 'up':
        return { opacity: baseOpacity, transform: 'translateY(50px)' };
      case 'down':
        return { opacity: baseOpacity, transform: 'translateY(-50px)' };
      case 'scale':
        return { opacity: baseOpacity, transform: 'scale(0.9)' };
      case 'fade':
      default:
        return { opacity: baseOpacity, transform: 'none' };
    }
  }, [direction]);

  const visibleStyles = {
    opacity: 1,
    transform: 'translateX(0) translateY(0) scale(1)',
  };

  const initialStyles = getInitialStyles();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? visibleStyles.opacity : initialStyles.opacity,
        transform: isVisible ? visibleStyles.transform : initialStyles.transform,
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

// Alternating animation for timeline items
export const useAlternatingDirection = (index: number): AnimationDirection => {
  return index % 2 === 0 ? 'left' : 'right';
};

// Staggered delay calculator
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => {
  return index * baseDelay;
};

// Hook for image card hover/scroll effects
export const useImageCardAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3, rootMargin: '-10% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

// Hook for typewriter effect
export const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });

  useEffect(() => {
    if (!isVisible) return;
    
    let index = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isVisible, text, speed]);

  return { ref, displayText, isComplete, isVisible };
};

// Stagger children animation hook
export const useStaggerAnimation = (itemCount: number, baseDelay: number = 0.1) => {
  const getDelay = useCallback((index: number) => baseDelay * index, [baseDelay]);
  return { getDelay };
};

export default useScrollAnimation;
