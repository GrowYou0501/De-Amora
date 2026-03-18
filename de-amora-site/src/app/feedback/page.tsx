"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!feedbackText.trim()) {
      setError("Please enter your feedback.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedbackText }),
      });

      if (res.ok) {
        setSuccess(true);
        setRating(0);
        setFeedbackText("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to reach server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div className="page-container radial-glow-gold">
        <div className="page-section">
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
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
                Your Voice Matters
              </p>
              <h1 className="page-title gradient-text-gold">Share Your Experience</h1>
              <p
                className="page-subtitle"
                style={{ margin: "0 auto", marginTop: "12px" }}
              >
                We treasure every piece of feedback. Help us elevate your
                dining experience.
              </p>
            </div>

            {success ? (
              <div
                className="glass-card-gold animate-fade-in-up"
                style={{
                  padding: "48px",
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    marginBottom: "12px",
                    color: "var(--accent-gold-light)",
                  }}
                >
                  Thank You!
                </h2>
                <p style={{ color: "var(--text-body)", fontSize: "15px", lineHeight: 1.6 }}>
                  Your feedback has been received. We appreciate you taking the
                  time to help us improve.
                </p>
                <button
                  className="btn-gold-outline"
                  style={{ marginTop: "32px" }}
                  onClick={() => setSuccess(false)}
                >
                  Leave Another Review
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card-gold animate-fade-in-up"
                style={{ padding: "40px" }}
              >
                {/* Star Rating */}
                <div style={{ marginBottom: "28px" }}>
                  <label className="form-label">Your Rating</label>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      marginTop: "4px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className="star-btn"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          color:
                            star <= (hoverRating || rating)
                              ? "#C9A96E"
                              : "rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div style={{ marginBottom: "28px" }}>
                  <label className="form-label" htmlFor="feedback">
                    Your Feedback
                  </label>
                  <textarea
                    id="feedback"
                    className="form-textarea"
                    placeholder="Tell us about your experience at De Amora..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={5}
                  />
                </div>

                {error && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#fca5a5",
                      marginBottom: "16px",
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-gold"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
