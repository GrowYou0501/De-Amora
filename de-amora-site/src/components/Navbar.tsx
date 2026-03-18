"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Offers", href: "/offers" },
    { label: "Order", href: "/order" },
    { label: "Feedback", href: "/feedback" },
  ];

  return (
    <>
      <nav
        id="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(20px, 4vw, 60px)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        background:
          scrolled || !isHome
            ? "rgba(5, 5, 5, 0.85)"
            : "transparent",
        backdropFilter:
          scrolled || !isHome
            ? "blur(20px) saturate(180%)"
            : "none",
        WebkitBackdropFilter:
          scrolled || !isHome
            ? "blur(20px) saturate(180%)"
            : "none",
        borderBottom:
          scrolled || !isHome
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "1px solid rgba(201, 169, 110, 0.3)",
          }}
        >
          <Image
            src="/logo.jpeg"
            alt="De Amora"
            width={64}
            height={64}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              transform: "scale(1.35)",
            }}
            priority
          />
        </div>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontSize: "16px",
            letterSpacing: "-0.01em",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          De Amora
        </span>
      </Link>

      {/* Center Nav Links (Desktop) */}
      <div
        className="hidden md:flex"
        style={{
          alignItems: "center",
          gap: "clamp(16px, 3vw, 36px)",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontSize: "13px",
              fontWeight: pathname === link.href ? 500 : 400,
              color:
                pathname === link.href
                  ? "var(--accent-gold-light)"
                  : "rgba(255, 255, 255, 0.55)",
              textDecoration: "none",
              transition: "color 0.3s ease",
              letterSpacing: "-0.01em",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent-gold-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                pathname === link.href
                  ? "var(--accent-gold-light)"
                  : "rgba(255, 255, 255, 0.55)")
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Admin Button (Far Right) */}
        <Link
          href="/admin"
          className="hidden sm:block"
          style={{
            fontSize: "13px",
            padding: "7px 20px",
            flexShrink: 0,
            background:
              pathname.startsWith("/admin")
                ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))"
                : "rgba(255, 255, 255, 0.06)",
            color: pathname.startsWith("/admin") ? "#050505" : "rgba(255, 255, 255, 0.7)",
            border: pathname.startsWith("/admin")
              ? "none"
              : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "980px",
            textDecoration: "none",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (!pathname.startsWith("/admin")) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
            }
          }}
          onMouseLeave={(e) => {
            if (!pathname.startsWith("/admin")) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
            }
          }}
        >
          Admin
        </Link>
        
        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent-gold-light)",
          }}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(5, 5, 5, 0.98)",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          paddingTop: "56px",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "28px",
              fontWeight: 600,
              color: pathname === link.href ? "var(--accent-gold-light)" : "white",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/admin"
          onClick={() => setMobileOpen(false)}
          style={{
            marginTop: "16px",
            padding: "12px 32px",
            fontSize: "16px",
            fontWeight: 600,
            background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))",
            color: "#050505",
            borderRadius: "980px",
            textDecoration: "none",
          }}
        >
          Admin Portal
        </Link>
      </div>
    </>
  );
}
