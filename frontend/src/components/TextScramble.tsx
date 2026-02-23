import { useEffect, useRef, useState } from 'react';

/* ── Text scramble / decode effect ───────────────────────────────────
   The text starts as garbled cipher characters and resolves
   letter‑by‑letter into the target string.                          */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>[]{}';

interface TextScrambleProps {
  /** The final resolved text */
  text: string;
  /** ms before the animation starts */
  delay?: number;
  /** ms per character resolve step */
  speed?: number;
  className?: string;
}

export default function TextScramble({
  text,
  delay = 800,
  speed = 60,
  className = '',
}: TextScrambleProps) {
  const [display, setDisplay] = useState(() =>
    // Start with random characters so something is visible immediately
    Array.from({ length: text.length }, (_, i) =>
      text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)],
    ).join(''),
  );
  const frameRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    // Phase 1: show random characters for `delay` ms
    const randomize = () => {
      setDisplay(
        Array.from({ length: text.length }, (_, i) =>
          text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)],
        ).join(''),
      );
    };

    // Scramble at a relaxed pace
    const scrambleTimer = setInterval(randomize, 80);

    const startResolve = () => {
      clearInterval(scrambleTimer);

      let resolved = 0;

      frameRef.current = setInterval(() => {
        resolved += 1;

        setDisplay(
          Array.from({ length: text.length }, (_, i) => {
            if (text[i] === ' ') return ' ';
            if (i < resolved) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join(''),
        );

        if (resolved >= text.length) {
          clearInterval(frameRef.current);
          setDisplay(text);
        }
      }, speed);
    };

    const delayTimer = setTimeout(startResolve, delay);

    return () => {
      clearInterval(scrambleTimer);
      clearInterval(frameRef.current);
      clearTimeout(delayTimer);
    };
  }, [text, delay, speed]);

  return <span className={className}>{display}</span>;
}
