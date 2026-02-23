import { useEffect, useRef } from 'react';

/* ── Cinematic Film-Grain Overlay ────────────────────────────────────
   Renders a very subtle animated noise/grain texture using a
   tiny off-screen canvas. Gives the page a premium, cinematic feel.  */

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Small canvas, tiled via CSS
    canvas.width = 256;
    canvas.height = 256;

    let animId: number;

    const draw = () => {
      const imageData = ctx.createImageData(256, 256);
      const d = imageData.data;

      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 12; // very low opacity
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9997] w-full h-full"
      style={{
        opacity: 0.35,
        mixBlendMode: 'overlay',
        imageRendering: 'pixelated',
      }}
    />
  );
}
