"use client";

import { useEffect, useRef, type RefObject } from "react";

type PointerState = { x: number; y: number };

type Star = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  phase: number;
  depth: number;
};

type EnergyParticle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  squash: number;
  phase: number;
};

type CosmicCanvasProps = {
  active: boolean;
  mobile: boolean;
  reducedMotion: boolean;
  pointerRef: RefObject<PointerState>;
  portalRef: RefObject<HTMLDivElement | null>;
};

function createRandom(seed = 92741) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export default function CosmicCanvas({
  active,
  mobile,
  reducedMotion,
  pointerRef,
  portalRef,
}: CosmicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!context) return;

    const mobileEffects = mobile || window.matchMedia("(max-width: 767px)").matches;
    const random = createRandom(mobileEffects ? 48131 : 92741);
    const starCount = mobileEffects ? 52 : 88;
    const energyCount = mobileEffects ? 44 : 104;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: random(),
      y: random(),
      size: 0.45 + random() * 1.35,
      alpha: 0.16 + random() * 0.54,
      phase: random() * Math.PI * 2,
      depth: 0.25 + random() * 0.75,
    }));
    const particles: EnergyParticle[] = Array.from({ length: energyCount }, () => ({
      angle: random() * Math.PI * 2,
      radius: 0.35 + random() * 0.39,
      speed: (0.018 + random() * 0.058) * (random() > 0.18 ? 1 : -1),
      size: 0.55 + random() * 1.55,
      alpha: 0.16 + random() * 0.64,
      squash: 0.76 + random() * 0.2,
      phase: random() * Math.PI * 2,
    }));

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let portalRadius = 280;
    let frame = 0;
    let visible = active && !document.hidden;
    let smoothPointerX = 0;
    let smoothPointerY = 0;
    let pulseStartedAt = -1;
    let nextPulseAt = performance.now() + 10000 + random() * 5000;
    let lastMobilePaint = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, mobileEffects ? 1.15 : 1.5);
      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const portalBounds = portalRef.current?.getBoundingClientRect();
      if (portalBounds) {
        centerX = portalBounds.left - bounds.left + portalBounds.width / 2;
        centerY = portalBounds.top - bounds.top + portalBounds.height / 2;
        portalRadius = Math.min(portalBounds.width, portalBounds.height) / 2;
      } else {
        centerX = width * (mobileEffects ? 0.5 : 0.7);
        centerY = height * (mobileEffects ? 0.73 : 0.51);
        portalRadius = Math.min(width, height) * 0.35;
      }
    };

    const draw = (now: number) => {
      if (
        mobileEffects &&
        !reducedMotion &&
        lastMobilePaint > 0 &&
        now - lastMobilePaint < 1000 / 45
      ) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastMobilePaint = now;

      context.clearRect(0, 0, width, height);
      const time = now / 1000;
      const pointer = pointerRef.current;
      smoothPointerX += (pointer.x - smoothPointerX) * 0.035;
      smoothPointerY += (pointer.y - smoothPointerY) * 0.035;

      for (const star of stars) {
        const twinkle = 0.62 + Math.sin(time * (0.55 + star.depth) + star.phase) * 0.38;
        const x = star.x * width + smoothPointerX * star.depth * 8;
        const y = star.y * height + smoothPointerY * star.depth * 6;
        context.globalAlpha = star.alpha * twinkle;
        context.fillStyle = star.depth > 0.66 ? "#dbeafe" : "#a5b4fc";
        context.fillRect(x, y, star.size, star.size);
      }

      let pulseAmount = 0;
      if (!mobileEffects && !reducedMotion && now >= nextPulseAt && pulseStartedAt < 0) {
        pulseStartedAt = now;
      }
      if (pulseStartedAt >= 0) {
        const progress = Math.min(1, (now - pulseStartedAt) / 1900);
        pulseAmount = Math.sin(progress * Math.PI);
        if (progress >= 1) {
          pulseStartedAt = -1;
          nextPulseAt = now + 10000 + random() * 5000;
        }
      }

      context.globalCompositeOperation = "lighter";
      for (const particle of particles) {
        const angle = particle.angle + time * particle.speed;
        const baseRadius = particle.radius * portalRadius;
        const radialOffset = pulseAmount * portalRadius * (0.09 + particle.radius * 0.08);
        const radius = baseRadius + radialOffset;
        const x = centerX + Math.cos(angle) * radius + smoothPointerX * 9;
        const y = centerY + Math.sin(angle) * radius * particle.squash + smoothPointerY * 7;
        const shimmer = 0.72 + Math.sin(time * 1.2 + particle.phase) * 0.28;

        context.globalAlpha = particle.alpha * shimmer * 0.22;
        context.fillStyle = particle.phase > Math.PI ? "#60a5fa" : "#c084fc";
        context.beginPath();
        context.arc(x, y, particle.size * 3.1, 0, Math.PI * 2);
        context.fill();

        context.globalAlpha = particle.alpha * shimmer;
        context.fillStyle = particle.phase > Math.PI ? "#bae6fd" : "#e9d5ff";
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      if (pulseAmount > 0.01) {
        context.globalAlpha = (1 - pulseAmount) * 0.45;
        context.strokeStyle = "#93c5fd";
        context.lineWidth = 1;
        context.beginPath();
        context.arc(centerX, centerY, portalRadius * (0.34 + pulseAmount * 0.55), 0, Math.PI * 2);
        context.stroke();
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      if (visible && !reducedMotion) frame = requestAnimationFrame(draw);
    };

    const renderStatic = () => draw(0);
    const start = () => {
      cancelAnimationFrame(frame);
      visible = active && !document.hidden;
      if (!visible) return;
      if (reducedMotion) renderStatic();
      else frame = requestAnimationFrame(draw);
    };
    const handleVisibility = () => start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion || !visible) renderStatic();
    });
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    if (portalRef.current) resizeObserver.observe(portalRef.current);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    start();

    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [active, mobile, pointerRef, portalRef, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
