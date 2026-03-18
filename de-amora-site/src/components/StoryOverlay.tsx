"use client";

import { useEffect, useState } from "react";

interface StoryOverlayProps {
  id?: string;
  alignment: "left" | "center" | "right";
  headline: string;
  subcopy: string[];
  scrollStart: number;
  scrollEnd: number;
  label?: string;
  largeHeadline?: boolean;
  topOffset?: string;
}

export default function StoryOverlay({
  id,
  alignment,
  headline,
  subcopy,
  scrollStart,
  scrollEnd,
  label,
  largeHeadline,
  topOffset,
}: StoryOverlayProps) {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(30);
  const [translateX, setTranslateX] = useState(
    alignment === "left" ? -30 : alignment === "right" ? 30 : 0
  );

  useEffect(() => {
    const stickyContainer = document.getElementById("overview");
    if (!stickyContainer) return;

    const handleScroll = () => {
      const rect = stickyContainer.getBoundingClientRect();
      const scrollableHeight =
        stickyContainer.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      const rangeSize = scrollEnd - scrollStart;
      const fadeInDuration = rangeSize * 0.15;
      const fadeOutDuration = rangeSize * 0.15;
      const fadeInEnd = scrollStart + fadeInDuration;
      const fadeOutStart = scrollEnd - fadeOutDuration;

      let newOpacity = 0;

      if (progress >= scrollStart && progress <= scrollEnd) {
        if (scrollStart === 0 && progress < fadeInDuration) {
          newOpacity = 1;
        } else if (progress < fadeInEnd) {
          newOpacity = Math.min(1, (progress - scrollStart) / fadeInDuration);
        } else if (progress > fadeOutStart) {
          newOpacity = Math.max(
            0,
            (scrollEnd - progress) / fadeOutDuration
          );
        } else {
          newOpacity = 1;
        }
      }

      const entryRatio =
        rangeSize > 0
          ? Math.min(1, Math.max(0, (progress - scrollStart) / (rangeSize * 0.3)))
          : 0;
      const effectiveEntry = scrollStart === 0 ? Math.max(entryRatio, progress < 0.01 ? 1 : entryRatio) : entryRatio;
      const eased = 1 - Math.pow(1 - effectiveEntry, 3);

      const tY = 30 * (1 - eased);
      let tX = 0;
      if (alignment === "left") tX = -30 * (1 - eased);
      if (alignment === "right") tX = 30 * (1 - eased);

      const isMobile = window.innerWidth <= 768;

      if (scrollStart === 0 && progress <= 0.001) {
        setOpacity(1);
        setTranslateY(0);
        setTranslateX(0);
        return;
      }

      setOpacity(newOpacity);
      setTranslateY(isMobile ? 0 : tY);
      setTranslateX(isMobile ? 0 : tX);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollStart, scrollEnd, alignment]);

  const positionStyle: React.CSSProperties = {
    position: "fixed",
    top: topOffset || "22%",
    zIndex: 20,
    pointerEvents: opacity > 0.3 ? "auto" : "none",
    opacity,
    transition: "opacity 0.12s ease-out",
    textAlign: alignment === "center" ? "center" : "left",
    maxWidth: alignment === "center" ? "700px" : "520px",
  };

  // On mobile, force center alignment for better readability and prevent horizontal cutoff
  const isMobileSize = typeof window !== 'undefined' && window.innerWidth <= 768;
  const effectiveAlignment = isMobileSize ? "center" : alignment;

  if (effectiveAlignment === "center") {
    positionStyle.left = "50%";
    positionStyle.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`;
    positionStyle.textAlign = "center";
  } else if (effectiveAlignment === "left") {
    positionStyle.left = "clamp(30px, 8vw, 120px)";
    positionStyle.transform = `translate(${translateX}px, calc(-50% + ${translateY}px))`;
  } else {
    positionStyle.right = "clamp(30px, 8vw, 120px)";
    positionStyle.transform = `translate(${translateX}px, calc(-50% + ${translateY}px))`;
  }

  return (
    <div id={id} style={positionStyle}>
      {label && (
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent-gold)",
            marginBottom: "16px",
          }}
        >
          {label}
        </p>
      )}
      <h2
        className="gradient-text-gold text-glow-gold"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: largeHeadline ? "clamp(50px, 8vw, 110px)" : "clamp(32px, 4vw, 58px)",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          marginBottom: "20px",
        }}
      >
        {headline}
      </h2>
      {subcopy.map((text, i) => (
        <p
          key={i}
          style={{
            fontSize: "clamp(14px, 1.1vw, 17px)",
            lineHeight: 1.7,
            color: "var(--text-body)",
            marginBottom: i < subcopy.length - 1 ? "12px" : "0",
            maxWidth: alignment === "center" ? "520px" : "480px",
            margin: alignment === "center" ? "0 auto" : undefined,
            marginTop: i > 0 ? "12px" : undefined,
          }}
        >
          {text}
        </p>
      ))}
    </div>
  );
}
