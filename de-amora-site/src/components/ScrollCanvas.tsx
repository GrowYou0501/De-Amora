"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;

// Generate frame paths
const framePaths = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
);

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, rect.width, rect.height);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = rect.width / rect.height;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = rect.width;
      drawHeight = rect.width / imgAspect;
      drawX = 0;
      drawY = (rect.height - drawHeight) / 2;
    } else {
      drawHeight = rect.height;
      drawWidth = rect.height * imgAspect;
      drawX = (rect.width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Preload all images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    framePaths.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        images[index] = img;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth interpolation loop
  useEffect(() => {
    if (!isLoaded) return;

    const lerp = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      if (current !== target) {
        // Ease toward target with smoothing factor
        const next = current + (target - current) * 0.15;
        const rounded = Math.round(next);
        if (rounded !== current) {
          currentFrameRef.current = rounded;
          drawFrame(rounded);
        }
        // If very close, snap
        if (Math.abs(target - next) < 0.5) {
          currentFrameRef.current = target;
          drawFrame(target);
        }
      }
      rafRef.current = requestAnimationFrame(lerp);
    };

    rafRef.current = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isLoaded, drawFrame]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isLoaded) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      targetFrameRef.current = frameIndex;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => drawFrame(currentFrameRef.current));

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoaded, drawFrame]);

  return (
    <div
      ref={containerRef}
      id="overview"
      style={{
        position: "relative",
        height: "500vh",
        background: "#050505",
      }}
    >
      {/* Sticky canvas viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Loading indicator */}
        {!isLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              background: "#050505",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "2px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "2px",
                overflow: "hidden",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${loadProgress}%`,
                  background:
                    "linear-gradient(90deg, var(--accent-gold-dark), var(--accent-gold), var(--accent-gold-light))",
                  borderRadius: "2px",
                  transition: "width 0.15s ease",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Preparing your experience · {loadProgress}%
            </span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "#050505",
          }}
        />

        {/* Warm gold radial glow behind burger */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(201, 169, 110, 0.03) 0%, transparent 70%)",
          }}
        />

        {/* Dark vignette on edges for cinematic premium feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5, 5, 5, 0.4) 100%)",
          }}
        />
      </div>
    </div>
  );
}
