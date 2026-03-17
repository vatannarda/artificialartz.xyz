import React, { useState, useEffect } from 'react';

const CHARS = '0123456789ABCDEF';

export function useDecryptText(text: string, duration: number = 800, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    let timeout: NodeJS.Timeout;
    let isCancelled = false;

    // Initial scramble
    setDisplayText(text.replace(/[^\s]/g, () => CHARS[Math.floor(Math.random() * CHARS.length)]));

    const animate = (time: number) => {
      if (isCancelled) return;
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress >= 1) {
        setDisplayText(text);
        return;
      }

      // Heavy ease out
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentLength = Math.floor(easeProgress * text.length);
      
      let newText = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ' || text[i] === '\n') {
          newText += text[i];
        } else if (i < currentLength) {
          newText += text[i];
        } else {
          newText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(newText);
      animationFrame = requestAnimationFrame(animate);
    };

    timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [text, duration, delay]);

  return displayText;
}

export function DecryptedText({ text, duration = 800, delay = 0, className = '', as: Component = 'span' }: any) {
  const decrypted = useDecryptText(text, duration, delay);
  return <Component className={className}>{decrypted}</Component>;
}
