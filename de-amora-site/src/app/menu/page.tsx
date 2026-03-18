"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Size {
  label: string;
  price: number;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  sizes: Size[];
}

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch(`${API}/menu`)
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  // Group by category
  const grouped = filtered.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div className="page-container radial-glow-gold">
        <div className="page-section">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
              Curated with Passion
            </p>
            <h1 className="page-title gradient-text-gold">Explore Our Menu</h1>
            <p
              className="page-subtitle"
              style={{ margin: "0 auto", marginTop: "12px" }}
            >
              Every dish crafted to perfection — from artisanal pizzas to
              signature chaaps, handcrafted shakes, and beyond.
            </p>
          </div>

          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "48px",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
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

          {/* Menu Groups */}
          {!loading &&
            Object.entries(grouped).map(([category, catItems], idx) => (
              <div
                key={category}
                style={{
                  marginBottom: "56px",
                  animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.1}s both`,
                }}
              >
                {/* Category Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "24px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "var(--accent-gold-light)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {category}
                  </h2>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, var(--gold-border), transparent)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {catItems.length} items
                  </span>
                </div>

                {/* Items Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {catItems.map((item) => (
                    <div
                      key={item._id}
                      className="glass-card-gold"
                      style={{ padding: "20px 24px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "8px",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--text-heading)",
                            flex: 1,
                            marginRight: "12px",
                          }}
                        >
                          {item.name}
                        </h3>
                      </div>

                      {item.description && (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "var(--text-muted)",
                            lineHeight: 1.5,
                            marginBottom: "12px",
                          }}
                        >
                          {item.description}
                        </p>
                      )}

                      {/* Sizes & Prices */}
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        {item.sizes.map((s) => (
                          <div
                            key={s.label}
                            style={{
                              padding: "5px 14px",
                              borderRadius: "8px",
                              background: "rgba(201, 169, 110, 0.08)",
                              border: "1px solid rgba(201, 169, 110, 0.15)",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "var(--accent-gold)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {s.label}
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "var(--accent-gold-light)",
                              }}
                            >
                              ₹{s.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {!loading && items.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--text-muted)",
              }}
            >
              <p style={{ fontSize: "18px" }}>
                Menu items are being prepared...
              </p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                Please check back soon.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
