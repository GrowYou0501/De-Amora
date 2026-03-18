"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// SVG Icons as inline components
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function OrderPage() {
  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div className="page-container">
        {/* Hero Section */}
        <section
          style={{
            position: "relative",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "80px 24px",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201, 169, 110, 0.06) 0%, transparent 70%)",
            overflow: "hidden",
          }}
        >
          {/* Decorative Elements */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "8%",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201, 169, 110, 0.04) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "10%",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201, 169, 110, 0.03) 0%, transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />

          <div className="animate-fade-in-up">
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "24px",
              }}
            >
              Your Table Awaits
            </p>

            <h1
              className="gradient-text-gold text-glow-gold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                marginBottom: "24px",
                maxWidth: "800px",
              }}
            >
              Indulge in culinary
              <br />
              excellence, tonight.
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 20px)",
                lineHeight: 1.7,
                color: "var(--text-body)",
                maxWidth: "560px",
                margin: "0 auto 48px",
              }}
            >
              Where every dish tells a story of passion, precision, and pure
              artistry. De Amora is not just a meal — it&apos;s a moment you&apos;ll
              treasure.
            </p>

            {/* Phone Number CTA */}
            <a
              href="tel:9229600300"
              className="btn-gold"
              style={{
                fontSize: "20px",
                padding: "18px 48px",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <PhoneIcon />
              9229600300
            </a>

            <p
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                marginTop: "12px",
              }}
            >
              Call now for reservations & orders
            </p>
          </div>
        </section>

        {/* Info Cards Section */}
        <section
          className="page-section"
          style={{ paddingTop: "0" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              marginBottom: "80px",
            }}
          >
            {/* Location Card */}
            <div
              className="glass-card-gold"
              style={{ padding: "36px" }}
            >
              <div style={{ marginBottom: "16px" }}>
                <MapPinIcon />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--accent-gold-light)",
                  marginBottom: "12px",
                }}
              >
                Visit Us
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-body)",
                  lineHeight: 1.7,
                }}
              >
                Near Rohilla Complex, Gharaunda
                <br />
                <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  Open Mon – Sat: 8am – 11pm · Sun: 9am – 10pm
                </span>
              </p>
            </div>

            {/* Free Delivery Card */}
            <div
              className="glass-card-gold"
              style={{ padding: "36px" }}
            >
              <div style={{ marginBottom: "16px" }}>
                <TruckIcon />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--accent-gold-light)",
                  marginBottom: "12px",
                }}
              >
                Free Delivery
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-body)",
                  lineHeight: 1.7,
                }}
              >
                Minimum order ₹300 for complimentary delivery.
                <br />
                <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  Delivered fresh to your doorstep, always.
                </span>
              </p>
            </div>

            {/* Experience Card */}
            <div
              className="glass-card-gold"
              style={{ padding: "36px" }}
            >
              <div style={{ marginBottom: "16px" }}>
                <SparkleIcon />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--accent-gold-light)",
                  marginBottom: "12px",
                }}
              >
                The Experience
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-body)",
                  lineHeight: 1.7,
                }}
              >
                Freshly made, warmly served.
                <br />
                <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  Premium ingredients. Artisan recipes. Pure indulgence.
                </span>
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="glass-card-gold"
            style={{
              padding: "56px 40px",
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(201, 169, 110, 0.03) 0%, rgba(15, 15, 18, 0.6) 100%)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: "var(--text-heading)",
                marginBottom: "16px",
              }}
            >
              Don&apos;t Just Eat. <span style={{ color: "var(--accent-gold-light)" }}>Experience.</span>
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--text-body)",
                maxWidth: "500px",
                margin: "0 auto 32px",
              }}
            >
              Step into De Amora and discover why our guests call it the finest
              dining experience in Gharaunda. Every visit is a celebration of
              flavor.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="tel:9229600300"
                className="btn-gold"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <PhoneIcon /> Call Now
              </a>
              <a
                href="/menu"
                className="btn-gold-outline"
                style={{ textDecoration: "none" }}
              >
                Explore Menu
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
