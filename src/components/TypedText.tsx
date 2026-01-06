import { useTypedText } from '@/hooks/useTypedText';

interface TypedTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypedText({ 
  text, 
  speed = 50, 
  startDelay = 300,
  className = '',
  onComplete 
}: TypedTextProps) {
  const { displayedText, showCursor } = useTypedText({ 
    text, 
    speed, 
    startDelay,
    onComplete 
  });

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="inline-block w-0.5 h-[0.9em] bg-[#8B5CF6] ml-1 align-middle animate-pulse" />}
    </span>
  );
}

