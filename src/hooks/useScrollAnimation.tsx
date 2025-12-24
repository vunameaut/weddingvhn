import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
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
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  duration?: number;
}

export const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  duration = 0.8
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(60px)';
      case 'down': return 'translateY(-60px)';
      case 'left': return 'translateX(-60px)';
      case 'right': return 'translateX(60px)';
      case 'scale': return 'scale(0.8)';
      case 'none': return 'none';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0) scale(1)' : getInitialTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Hook for image card glow effect on scroll
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
