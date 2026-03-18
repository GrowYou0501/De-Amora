"use client";

import { useEffect, useRef, useState } from "react";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="order"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201, 169, 110, 0.04) 0%, #050505 70%)",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Decorative line */}
      <div
        style={{
          width: "40px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--accent-gold), transparent)",
          marginBottom: "40px",
          opacity: 0.6,
        }}
      />

      <h2
        className="gradient-text-gold text-glow-gold"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 5vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          marginBottom: "20px",
          maxWidth: "700px",
        }}
      >
        Taste perfection.
        <br />
        Forget the world.
      </h2>

      <p
        style={{
          fontSize: "clamp(16px, 1.3vw, 20px)",
          lineHeight: 1.6,
          color: "var(--text-body)",
          maxWidth: "520px",
          marginBottom: "48px",
        }}
      >
        De Amora. Designed for the senses, crafted for pure indulgence.
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <a
          href="/order"
          className="btn-gold"
          style={{
            fontSize: "16px",
            padding: "14px 36px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Order Now
        </a>
        <a
          href="/menu"
          className="btn-gold-outline"
          style={{
            fontSize: "16px",
            padding: "14px 36px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Explore Our Menu
        </a>
      </div>

      {/* Micro-copy */}
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-muted)",
          marginTop: "32px",
          letterSpacing: "0.01em",
        }}
      >
        Curated for quiet mornings, intimate dinners, and every moment in
        between.
      </p>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(to top, var(--bg-secondary), transparent)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
