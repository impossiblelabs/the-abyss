import { useEffect, useRef } from "react";

const ParticleBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const seed = (s: number) => {
        let v = s;
        return () => {
          v = (v * 16807 + 0) % 2147483647;
          return (v - 1) / 2147483646;
        };
      };
      const rng = seed(12345);

      const layers = [
        {
          count: 5000,
          alphaBase: 0.08,
          alphaRange: 0.35,
          rBase: 0.3,
          rRange: 0.9,
          hueBase: 20,
          hueRange: 25,
          satBase: 75,
          satRange: 25,
          litBase: 35,
          litRange: 30,
        },
        {
          count: 2000,
          alphaBase: 0.1,
          alphaRange: 0.4,
          rBase: 0.6,
          rRange: 2,
          hueBase: 18,
          hueRange: 28,
          satBase: 80,
          satRange: 20,
          litBase: 40,
          litRange: 25,
        },
        {
          count: 400,
          alphaBase: 0.15,
          alphaRange: 0.5,
          rBase: 1.2,
          rRange: 2.5,
          hueBase: 25,
          hueRange: 18,
          satBase: 85,
          satRange: 15,
          litBase: 50,
          litRange: 25,
        },
      ];

      for (const l of layers) {
        for (let i = 0; i < l.count; i++) {
          const x = rng() * w;
          const y = rng() * h;
          const alpha = l.alphaBase + rng() * l.alphaRange;
          const radius = l.rBase + rng() * l.rRange;
          const hue = l.hueBase + rng() * l.hueRange;
          const sat = l.satBase + rng() * l.satRange;
          const lit = l.litBase + rng() * l.litRange;
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${lit}%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Layer 4: rare extra-bright hot specks
      for (let i = 0; i < 80; i++) {
        const x = rng() * w;
        const y = rng() * h;
        const alpha = 0.3 + rng() * 0.5;
        const radius = 1.5 + rng() * 3;
        const hue = 28 + rng() * 15;
        ctx.fillStyle = `hsla(${hue}, 95%, ${60 + rng() * 15}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="fusion-bg">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ParticleBg;
