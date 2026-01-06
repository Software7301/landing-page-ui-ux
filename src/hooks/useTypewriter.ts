import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed: number = 50, enabled: boolean = true) {
  const safeText = typeof text === 'string' ? text : String(text || '');
  const [displayedText, setDisplayedText] = useState(safeText);
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);
  const textRef = useRef(safeText);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const newText = typeof text === 'string' ? text : String(text || '');
    textRef.current = newText;
    currentIndexRef.current = 0;
    
    if (!newText || newText.length === 0) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    if (!enabled) {
      setDisplayedText(newText);
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    intervalRef.current = setInterval(() => {
      if (!enabledRef.current) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayedText(textRef.current);
        setIsTyping(false);
        return;
      }

      if (currentIndexRef.current < textRef.current.length) {
        setDisplayedText(textRef.current.slice(0, currentIndexRef.current + 1));
        currentIndexRef.current++;
      } else {
        setIsTyping(false);
        setDisplayedText(textRef.current);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, speed) as unknown as number;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed, enabled]);

  return { displayedText: displayedText || safeText, isTyping };
}

