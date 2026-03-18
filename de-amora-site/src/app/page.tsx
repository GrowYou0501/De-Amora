"use client";

import Navbar from "@/components/Navbar";
import ScrollCanvas from "@/components/ScrollCanvas";
import StoryOverlay from "@/components/StoryOverlay";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      style={{
        background: "#050505",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar />

      {/* ==========================================
          SCROLL-LINKED IMAGE SEQUENCE + OVERLAYS
          ========================================== */}
      <div style={{ position: "relative" }}>
        <ScrollCanvas />

        {/* BEAT 1: Hero / Intro — 0–15% */}
        <StoryOverlay
          alignment="center"
          headline="De Amora"
          label="Where Taste Meets Elegance"
          subcopy={["Crafted for those who appreciate the finer things."]}
          scrollStart={0.0}
          scrollEnd={0.15}
          largeHeadline={true}
        />

        {/* BEAT 2: Pizza Reveal — 15–40% */}
        <StoryOverlay
          id="menu"
          alignment="left"
          headline="Culinary precision in every slice."
          label="The Reveal"
          subcopy={[
            "Hand-tossed crust. Molten cheese. Wood-fired perfection.",
            "Every ingredient is sourced for balance, richness, and texture—layer after layer.",
          ]}
          scrollStart={0.15}
          scrollEnd={0.4}
          topOffset="40%"
        />

        {/* BEAT 3: Artisanal Ingredients — 40–65% */}
        <StoryOverlay
          id="offers"
          alignment="right"
          headline="Pure flavor, beautifully crafted."
          label="Artisanal Ingredients"
          subcopy={[
            "Hand-picked ingredients at their absolute peak.",
            "Chef-crafted recipes to elevate every dish.",
            "A perfect balance of taste across our entire menu.",
          ]}
          scrollStart={0.4}
          scrollEnd={0.65}
        />

        {/* BEAT 4: Taste & Artistry — 65–85% */}
        <StoryOverlay
          alignment="left"
          headline="Unforgettable, multi-sensory flavor."
          label="Taste & Artistry"
          subcopy={[
            "Masterful culinary techniques unlock depth, richness, and perfect texture in every dish.",
            "Innovative flavor pairings elevate timeless recipes, transforming a simple meal into an extraordinary dining experience.",
          ]}
          scrollStart={0.65}
          scrollEnd={0.85}
          topOffset="40%"
        />

        {/* BEAT 5: Reassembly hint — 85–100% (text fades before CTA section) */}
        <StoryOverlay
          alignment="center"
          headline="The perfect composition."
          label="Reassembled"
          subcopy={[
            "Every slice returns to its place—a symphony of flavor, crust, and visual artistry.",
          ]}
          scrollStart={0.85}
          scrollEnd={1.0}
        />
      </div>

      {/* ==========================================
          CTA SECTION (after scrollytelling)
          ========================================== */}
      <CTASection />

      {/* ==========================================
          FOOTER
          ========================================== */}
      <Footer />
    </main>
  );
}
