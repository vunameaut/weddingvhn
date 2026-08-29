import { useTypewriter } from '@/hooks/useScrollAnimation';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 50, className = '' }: TypewriterTextProps) => {
  const { ref, displayText, isComplete } = useTypewriter(text, speed);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <span className="font-dancing text-xl md:text-2xl text-secondary">
        {displayText}
        <span 
          className={`inline-block w-0.5 h-6 bg-secondary ml-1 ${
            isComplete ? 'animate-pulse' : 'animate-pulse'
          }`}
          style={{ 
            animation: isComplete ? 'none' : 'blink-caret 0.75s step-end infinite',
            opacity: isComplete ? 0 : 1
          }}
        />
      </span>
    </div>
  );
};

export default TypewriterText;

