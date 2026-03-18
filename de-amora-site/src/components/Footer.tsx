"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "60px 24px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "48px",
        }}
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "12px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            De Amora
          </h3>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--text-muted)",
            }}
          >
            Freshly Made, Warmly Served.
            <br />
            Premium café experience.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-body)",
              marginBottom: "16px",
            }}
          >
            Explore
          </h4>
          {["Overview", "Menu", "Offers", "Order"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                display: "block",
                fontSize: "14px",
                color: "var(--text-muted)",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link}
            </a>
          ))}
        </div>

        {/* Connect */}
        <div>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-body)",
              marginBottom: "16px",
            }}
          >
            Connect
          </h4>
          {[
            { name: "Instagram", url: "https://www.instagram.com/deamoracafe?igsh=MTAzOGQzZ2JmNm5kbg==" },
            { name: "Twitter", url: "#" },
            { name: "Facebook", url: "#" }
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url !== "#" ? "_blank" : undefined}
              rel={link.url !== "#" ? "noopener noreferrer" : undefined}
              style={{
                display: "block",
                fontSize: "14px",
                color: "var(--text-muted)",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Hours */}
        <div>
          <h4
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-body)",
              marginBottom: "16px",
            }}
          >
            Visit Us
          </h4>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.8,
              color: "var(--text-muted)",
            }}
          >
            Mon – Sat: 8am – 11pm
            <br />
            Sunday: 9am – 10pm
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          © 2026 De Amora. All rights reserved.
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          Crafted with passion & precision.
        </p>
      </div>
    </footer>
  );
}
