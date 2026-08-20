import React, { useEffect, useRef } from 'react';

interface LightningBolt {
  segments: { x: number; y: number }[];
  alpha: number;
  decay: number;
  color: string;
  width: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
}

export const LightningCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const bolts: LightningBolt[] = [];
    const particles: Particle[] = [];

    // Initialize ambient electric particles
    const particleCount = Math.min(width < 768 ? 35 : 65, 75);
    const colors = ['#38bdf8', '#06b6d4', '#60a5fa', '#93c5fd', '#a5f3fc'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.2,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        maxAlpha: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Function to generate a procedural lightning bolt
    const createLightningBolt = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      displace: number = 70,
      color: string = '#38bdf8',
      width: number = 2.5
    ) => {
      const segments: { x: number; y: number }[] = [];
      segments.push({ x: startX, y: startY });

      const generateSegments = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        disp: number
      ) => {
        if (disp < 5) {
          segments.push({ x: x2, y: y2 });
          return;
        }

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const normalX = -(y2 - y1);
        const normalY = x2 - x1;
        const len = Math.sqrt(normalX * normalX + normalY * normalY) || 1;

        const offset = (Math.random() - 0.5) * disp * 2;
        const branchX = midX + (normalX / len) * offset;
        const branchY = midY + (normalY / len) * offset;

        generateSegments(x1, y1, branchX, branchY, disp / 2);
        generateSegments(branchX, branchY, x2, y2, disp / 2);
      };

      generateSegments(startX, startY, endX, endY, displace);

      bolts.push({
        segments,
        alpha: 1.0,
        decay: 0.04 + Math.random() * 0.03,
        color,
        width,
      });
    };

    // Periodic random sky lightning / background electric arc
    let lastBoltTime = 0;
    const triggerRandomSkyBolt = (time: number) => {
      if (time - lastBoltTime > 3000 + Math.random() * 4000) {
        lastBoltTime = time;
        const startX = Math.random() * width;
        const startY = Math.random() * (height * 0.3);
        const endX = startX + (Math.random() - 0.5) * 400;
        const endY = startY + 150 + Math.random() * 350;

        createLightningBolt(startX, startY, endX, endY, 65, '#38bdf8', 2.5);

        // Occasional branch
        if (Math.random() > 0.4) {
          setTimeout(() => {
            createLightningBolt(
              startX + 30,
              startY + 50,
              endX + 80,
              endY + 100,
              45,
              '#a5f3fc',
              1.8
            );
          }, 60);
        }
      }
    };

    // User click adds instant electric bolt
    const handleCanvasClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      const originX = clickX + (Math.random() - 0.5) * 200;
      const originY = Math.max(0, clickY - 180 - Math.random() * 100);

      createLightningBolt(originX, originY, clickX, clickY, 40, '#67e8f9', 3);

      // Create burst particles
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1.5,
          alpha: 1,
          maxAlpha: 1,
          color: '#a5f3fc',
        });
      }
    };

    window.addEventListener('click', handleCanvasClick);

    // Animation Loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Update & render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      // Trigger automatic background bolts
      triggerRandomSkyBolt(time);

      // Update & render lightning bolts
      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.alpha -= bolt.decay;

        if (bolt.alpha <= 0) {
          bolts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = bolt.color;
        ctx.lineWidth = bolt.width;
        ctx.globalAlpha = bolt.alpha;
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#06b6d4';
        ctx.lineJoin = 'miter';
        ctx.lineCap = 'round';

        if (bolt.segments.length > 0) {
          ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
          for (let s = 1; s < bolt.segments.length; s++) {
            ctx.lineTo(bolt.segments[s].x, bolt.segments[s].y);
          }
        }
        ctx.stroke();

        // Inner bright white core of the lightning
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(1, bolt.width * 0.4);
        ctx.globalAlpha = bolt.alpha * 0.9;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';

        if (bolt.segments.length > 0) {
          ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
          for (let s = 1; s < bolt.segments.length; s++) {
            ctx.lineTo(bolt.segments[s].x, bolt.segments[s].y);
          }
        }
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="lightning-background-canvas"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
