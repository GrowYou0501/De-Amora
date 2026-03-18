"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  createdAt: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/offers`)
      .then((r) => r.json())
      .then((data) => {
        setOffers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div className="page-container radial-glow-gold">
        <div className="page-section">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                marginBottom: "16px",
              }}
            >
              Exclusive Deals
            </p>
            <h1 className="page-title gradient-text-gold">
              Special Offers
            </h1>
            <p
              className="page-subtitle"
              style={{ margin: "0 auto", marginTop: "12px" }}
            >
              Indulge in our handpicked promotions — curated to bring you
              the finest flavors at extraordinary value.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid var(--glass-border)",
                  borderTopColor: "var(--accent-gold)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Offers Grid */}
          {!loading && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
              }}
            >
              {offers.map((offer, idx) => (
                <div
                  key={offer._id}
                  className="glass-card-gold shimmer"
                  style={{
                    padding: "32px",
                    position: "relative",
                    overflow: "hidden",
                    animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.15}s both`,
                  }}
                >
                  {/* Discount Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background:
                        "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))",
                      color: "#050505",
                      fontWeight: 800,
                      fontSize: "20px",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      lineHeight: 1,
                    }}
                  >
                    {offer.discountPercentage}%
                    <span style={{ fontSize: "10px", display: "block", fontWeight: 600 }}>
                      OFF
                    </span>
                  </div>

                  {/* Decorative line */}
                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, var(--accent-gold), transparent)",
                      marginBottom: "20px",
                    }}
                  />

                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--text-heading)",
                      marginBottom: "12px",
                      maxWidth: "70%",
                    }}
                  >
                    {offer.title}
                  </h2>

                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--text-body)",
                      marginBottom: "24px",
                    }}
                  >
                    {offer.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#10b981",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#6ee7b7",
                        fontWeight: 500,
                      }}
                    >
                      Active Now
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && offers.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--text-muted)",
              }}
            >
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>🎁</p>
              <p style={{ fontSize: "18px" }}>
                New offers coming soon...
              </p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                Stay tuned for exclusive deals.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
