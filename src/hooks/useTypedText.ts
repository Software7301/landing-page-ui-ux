import { useState, useEffect, useRef } from 'react';

interface UseTypedTextOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export function useTypedText({ 
  text, 
  speed = 50, 
  startDelay = 300,
  onComplete 
}: UseTypedTextOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cursorIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (cursorIntervalRef.current) {
      clearInterval(cursorIntervalRef.current);
    }

    setDisplayedText('');
    setIsTyping(true);
    setShowCursor(true);

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsTyping(false);
          if (onComplete) {
            onComplete();
          }
        }
      }, speed);
    }, startDelay);

    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [text, speed, startDelay, onComplete]);

  return { displayedText, isTyping, showCursor };
}

