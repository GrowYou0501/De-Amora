"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const API = process.env.NEXT_PUBLIC_API_URL;

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

interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
}

interface Review {
  _id: string;
  rating: number;
  feedbackText: string;
  createdAt: string;
}

type Tab = "menu" | "offers" | "reviews";

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("menu");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Menu state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuSearchQuery, setMenuSearchQuery] = useState("");
  const [menuForm, setMenuForm] = useState({ name: "", description: "", category: "", sizes: "Regular:100" });
  const [editingMenu, setEditingMenu] = useState<string | null>(null);

  // Offers state
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offerForm, setOfferForm] = useState({ title: "", description: "", discountPercentage: "" });
  const [editingOffer, setEditingOffer] = useState<string | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const headers = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  // Auth check
  useEffect(() => {
    const t = localStorage.getItem("deamora_token");
    if (!t) {
      router.push("/admin");
      return;
    }
    setToken(t);
  }, [router]);

  // Fetch data
  const fetchMenu = useCallback(async () => {
    try {
      const res = await fetch(`${API}/menu`);
      const data = await res.json();
      setMenuItems(data);
    } catch { /* empty */ }
  }, []);

  const fetchOffers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/offers`);
      const data = await res.json();
      setOffers(data);
    } catch { /* empty */ }
  }, []);

  const fetchReviews = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/reviews`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setReviews(data);
    } catch { /* empty */ }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchMenu();
      fetchOffers();
      fetchReviews();
    }
  }, [token, fetchMenu, fetchOffers, fetchReviews]);

  // Parse sizes string "S:100,M:200,L:300"
  const parseSizes = (str: string): Size[] => {
    return str.split(",").map((s) => {
      const [label, price] = s.trim().split(":");
      return { label: label?.trim() || "Regular", price: Number(price?.trim()) || 0 };
    });
  };

  const sizesToString = (sizes: Size[]): string => {
    return sizes.map((s) => `${s.label}:${s.price}`).join(",");
  };

  // MENU CRUD
  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sizes = parseSizes(menuForm.sizes);
    const body = { name: menuForm.name, description: menuForm.description, category: menuForm.category, sizes };

    try {
      if (editingMenu) {
        const res = await fetch(`${API}/menu/${editingMenu}`, {
          method: "PUT", headers: headers(), body: JSON.stringify(body),
        });
        if (res.ok) { showToast("Menu item updated!", "success"); setEditingMenu(null); }
        else showToast("Failed to update.", "error");
      } else {
        const res = await fetch(`${API}/menu`, {
          method: "POST", headers: headers(), body: JSON.stringify(body),
        });
        if (res.ok) showToast("Menu item added!", "success");
        else showToast("Failed to add.", "error");
      }
      setMenuForm({ name: "", description: "", category: "", sizes: "Regular:100" });
      fetchMenu();
    } catch { showToast("Server error.", "error"); }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const res = await fetch(`${API}/menu/${id}`, { method: "DELETE", headers: headers() });
      if (res.ok) { showToast("Item deleted.", "success"); fetchMenu(); }
      else showToast("Failed to delete.", "error");
    } catch { showToast("Server error.", "error"); }
  };

  const editMenuItem = (item: MenuItem) => {
    setEditingMenu(item._id);
    setMenuForm({ name: item.name, description: item.description, category: item.category, sizes: sizesToString(item.sizes) });
  };

  // OFFERS CRUD
  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { title: offerForm.title, description: offerForm.description, discountPercentage: Number(offerForm.discountPercentage) };

    try {
      if (editingOffer) {
        const res = await fetch(`${API}/offers/${editingOffer}`, {
          method: "PUT", headers: headers(), body: JSON.stringify(body),
        });
        if (res.ok) { showToast("Offer updated!", "success"); setEditingOffer(null); }
        else showToast("Failed to update.", "error");
      } else {
        const res = await fetch(`${API}/offers`, {
          method: "POST", headers: headers(), body: JSON.stringify(body),
        });
        if (res.ok) showToast("Offer added!", "success");
        else showToast("Failed to add.", "error");
      }
      setOfferForm({ title: "", description: "", discountPercentage: "" });
      fetchOffers();
    } catch { showToast("Server error.", "error"); }
  };

  const deleteOffer = async (id: string) => {
    try {
      const res = await fetch(`${API}/offers/${id}`, { method: "DELETE", headers: headers() });
      if (res.ok) { showToast("Offer deleted.", "success"); fetchOffers(); }
      else showToast("Failed to delete.", "error");
    } catch { showToast("Server error.", "error"); }
  };

  const editOffer = (offer: Offer) => {
    setEditingOffer(offer._id);
    setOfferForm({ title: offer.title, description: offer.description, discountPercentage: String(offer.discountPercentage) });
  };

  // REVIEWS
  const deleteReview = async (id: string) => {
    try {
      const res = await fetch(`${API}/reviews/${id}`, { method: "DELETE", headers: headers() });
      if (res.ok) { showToast("Review deleted.", "success"); fetchReviews(); }
      else showToast("Failed to delete.", "error");
    } catch { showToast("Server error.", "error"); }
  };

  const handleLogout = () => {
    localStorage.removeItem("deamora_token");
    router.push("/admin");
  };

  if (!token) return null;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "menu", label: "Menu", count: menuItems.length },
    { key: "offers", label: "Offers", count: offers.length },
    { key: "reviews", label: "Reviews", count: reviews.length },
  ];

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar />

      <div className="page-container" style={{ paddingTop: "72px" }}>
        <div className="page-section">
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--text-heading)",
                }}
              >
                Admin Dashboard
              </h1>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
                Manage your café content
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#fca5a5",
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
              }}
            >
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--glass-border)",
              marginBottom: "32px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`admin-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
                <span
                  style={{
                    marginLeft: "6px",
                    fontSize: "11px",
                    padding: "1px 6px",
                    borderRadius: "6px",
                    background:
                      activeTab === tab.key
                        ? "rgba(201, 169, 110, 0.15)"
                        : "rgba(255, 255, 255, 0.05)",
                    color:
                      activeTab === tab.key
                        ? "var(--accent-gold)"
                        : "var(--text-muted)",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* ==================== MENU TAB ==================== */}
          {activeTab === "menu" && (
            <div>
              {/* Form */}
              <form
                onSubmit={handleMenuSubmit}
                className="glass-card"
                style={{
                  padding: "24px",
                  marginBottom: "24px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  alignItems: "end",
                }}
              >
                <div>
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    placeholder="Dish name"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <input
                    className="form-input"
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    placeholder="e.g. Burgers"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Sizes (label:price)</label>
                  <input
                    className="form-input"
                    value={menuForm.sizes}
                    onChange={(e) => setMenuForm({ ...menuForm, sizes: e.target.value })}
                    placeholder="S:100,M:200,L:300"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <input
                    className="form-input"
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <button type="submit" className="btn-gold" style={{ width: "100%" }}>
                    {editingMenu ? "Update Item" : "Add Item"}
                  </button>
                  {editingMenu && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMenu(null);
                        setMenuForm({ name: "", description: "", category: "", sizes: "Regular:100" });
                      }}
                      style={{
                        width: "100%", marginTop: "8px", padding: "8px",
                        background: "transparent", border: "1px solid var(--glass-border)",
                        borderRadius: "8px", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px",
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Search Bar */}
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search menu items by name or category..."
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                  style={{ width: "100%", maxWidth: "400px" }}
                />
              </div>

              {/* Table */}
              <div className="glass-card" style={{ overflow: "auto" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Sizes & Prices</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems
                      .filter(
                        (item) =>
                          item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(menuSearchQuery.toLowerCase())
                      )
                      .map((item) => (
                      <tr key={item._id}>
                        <td style={{ fontWeight: 500, color: "var(--text-heading)" }}>{item.name}</td>
                        <td>
                          <span
                            style={{
                              padding: "3px 10px", borderRadius: "6px",
                              background: "rgba(201, 169, 110, 0.08)",
                              border: "1px solid rgba(201, 169, 110, 0.15)",
                              fontSize: "12px", color: "var(--accent-gold)",
                            }}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td>
                          {item.sizes.map((s) => `${s.label}: ₹${s.price}`).join(" · ")}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            onClick={() => editMenuItem(item)}
                            style={{
                              padding: "5px 12px", fontSize: "12px", fontWeight: 500,
                              background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)",
                              borderRadius: "6px", color: "#93c5fd", cursor: "pointer", marginRight: "6px",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteMenuItem(item._id)}
                            style={{
                              padding: "5px 12px", fontSize: "12px", fontWeight: 500,
                              background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)",
                              borderRadius: "6px", color: "#fca5a5", cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== OFFERS TAB ==================== */}
          {activeTab === "offers" && (
            <div>
              <form
                onSubmit={handleOfferSubmit}
                className="glass-card"
                style={{
                  padding: "24px",
                  marginBottom: "24px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  alignItems: "end",
                }}
              >
                <div>
                  <label className="form-label">Title</label>
                  <input
                    className="form-input"
                    value={offerForm.title}
                    onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    placeholder="Offer title"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Discount %</label>
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    max="100"
                    value={offerForm.discountPercentage}
                    onChange={(e) => setOfferForm({ ...offerForm, discountPercentage: e.target.value })}
                    placeholder="e.g. 20"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <input
                    className="form-input"
                    value={offerForm.description}
                    onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                    placeholder="Offer description"
                    required
                  />
                </div>
                <div>
                  <button type="submit" className="btn-gold" style={{ width: "100%" }}>
                    {editingOffer ? "Update Offer" : "Add Offer"}
                  </button>
                  {editingOffer && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingOffer(null);
                        setOfferForm({ title: "", description: "", discountPercentage: "" });
                      }}
                      style={{
                        width: "100%", marginTop: "8px", padding: "8px",
                        background: "transparent", border: "1px solid var(--glass-border)",
                        borderRadius: "8px", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px",
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              <div className="glass-card" style={{ overflow: "auto" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Discount</th>
                      <th>Description</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer) => (
                      <tr key={offer._id}>
                        <td style={{ fontWeight: 500, color: "var(--text-heading)" }}>{offer.title}</td>
                        <td>
                          <span
                            style={{
                              padding: "3px 10px", borderRadius: "6px",
                              background: "rgba(16, 185, 129, 0.1)",
                              border: "1px solid rgba(16, 185, 129, 0.2)",
                              fontSize: "13px", fontWeight: 700, color: "#6ee7b7",
                            }}
                          >
                            {offer.discountPercentage}% OFF
                          </span>
                        </td>
                        <td style={{ maxWidth: "300px" }}>
                          <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {offer.description}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            onClick={() => editOffer(offer)}
                            style={{
                              padding: "5px 12px", fontSize: "12px", fontWeight: 500,
                              background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)",
                              borderRadius: "6px", color: "#93c5fd", cursor: "pointer", marginRight: "6px",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteOffer(offer._id)}
                            style={{
                              padding: "5px 12px", fontSize: "12px", fontWeight: 500,
                              background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)",
                              borderRadius: "6px", color: "#fca5a5", cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== REVIEWS TAB ==================== */}
          {activeTab === "reviews" && (
            <div>
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                }}
              >
                Showing {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                <span style={{ fontSize: "12px", marginLeft: "8px", color: "var(--text-muted)" }}>
                  (auto-limited to 50)
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "16px",
                }}
              >
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="glass-card"
                    style={{ padding: "20px", position: "relative" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: "16px",
                              color: s <= review.rating ? "#C9A96E" : "rgba(255,255,255,0.1)",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => deleteReview(review._id)}
                        style={{
                          padding: "4px 10px", fontSize: "11px", fontWeight: 500,
                          background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)",
                          borderRadius: "6px", color: "#fca5a5", cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "var(--text-body)",
                        marginBottom: "12px",
                      }}
                    >
                      {review.feedbackText}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>

              {reviews.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 0",
                    color: "var(--text-muted)",
                  }}
                >
                  <p style={{ fontSize: "18px" }}>No reviews yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
          {toast.msg}
        </div>
      )}
    </main>
  );
}
