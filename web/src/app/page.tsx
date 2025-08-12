"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaThLarge, FaLayerGroup, FaUserFriends, FaChartLine, FaFileAlt, FaSearch } from "react-icons/fa";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupMsg, setSignupMsg] = useState("");

  const toggleNav = useCallback(() => setNavOpen((v) => !v), []);

  const onSignup = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupMsg("");
    const email = signupEmail.trim();
    if (!email) {
      setSignupMsg("Please enter your email address.");
      return;
    }
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSignupMsg("Please enter a valid email address.");
      return;
    }
    if (!supabase) {
      setSignupMsg("Supabase env not set. Add env vars to enable join.");
      return;
    }
    // Join waitlist via passwordless sign-up (creates user in Supabase Auth)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (error) {
      const message = error.message?.toLowerCase() || "";
      if (message.includes("already registered") || message.includes("user already exists")) {
        setSignupMsg("Thanks! You're on the list. We'll notify you at launch.");
        setTimeout(() => setSignupOpen(false), 1200);
      } else {
        setSignupMsg(error.message);
      }
    } else {
      setSignupMsg("Thanks! You're on the list. We'll notify you at launch.");
      setSignupEmail("");
      setTimeout(() => setSignupOpen(false), 1200);
    }
  }, [signupEmail, router]);

  useEffect(() => {
    // close on outside click for mobile menu
    function onDocClick(e: MouseEvent) {
      const nav = document.getElementById("nav");
      const toggle = document.getElementById("menu-toggle");
      if (nav && toggle && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
        setNavOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Link href="/">NEUR</Link>
          </div>
          <nav id="nav" className={`nav ${navOpen ? "open" : ""}`}>
            <ul>
              <li>
                <button className="btn btn-outline" onClick={() => setSignupOpen(true)}>Join Waitlist</button>
              </li>
            </ul>
          </nav>
          <button id="menu-toggle" className="menu-toggle" aria-label="Toggle navigation" onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-inner container">
            <div className="hero-text">
              <h1>Promoting Fairness.<br />Empowering Justice.</h1>
              <p className="hero-tagline">Transparent tools for a more equitable court system.</p>
              <p>
                Too often, sentencing outcomes vary wildly between similar cases. Hidden biases, inconsistent data hurt defendants and communities alike. Our mission is to change that.
              </p>
              <div className="hero-cta">
                <a href="#offer" className="btn btn-primary">Learn More</a>
                <button className="btn btn-secondary" onClick={() => setSignupOpen(true)}>Join Waitlist</button>
              </div>
            </div>
            <div className="hero-image">
              <Image src="/cached_assets_used/hero.png" alt="Abstract illustration" width={600} height={400} />
            </div>
          </div>
        </section>

        <section className="cta section">
          <div className="container cta-inner">
            <h2>Ready to Drive Real, Measurable Change?</h2>
            <p>Bring data into the courtroom and champion sentencing reform today.</p>
            <button className="btn btn-light" onClick={() => setSignupOpen(true)}>Join Waitlist</button>
          </div>
        </section>

        <section id="offer" className="offer section">
          <div className="container">
            <h2>What We Offer</h2>
            <div className="offer-grid">
              <div className="offer-item">
                <FaThLarge />
                <h3>Data‑Driven Information</h3>
                <p>Identify sentencing disparities and uncover systemic patterns using modern analytics. We crunch comparable case data to provide contextual, consistent recommendations.</p>
              </div>
              <div className="offer-item">
                <FaLayerGroup />
                <h3>Transparency</h3>
                <p>Our tools are built to be fully transparent and auditable. Unlike hidden risk assessments, every recommendation can be understood, challenged and improved.</p>
              </div>
              <div className="offer-item">
                <FaUserFriends />
                <h3>Empowering Advocates</h3>
                <p>Designed for public defenders, legal nonprofits and advocacy groups, our platform streamlines case reviews and equips you with the data to drive meaningful reform.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features section">
          <div className="container">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <FaChartLine />
                <h3>Predictive Modeling</h3>
                <p>Forecast sentencing outcomes based on historical data, judge trends and similar cases, giving you context for negotiation and advocacy.</p>
              </div>
              <div className="feature-item">
                <FaFileAlt />
                <h3>AI Case Management</h3>
                <p>Streamline legal workflows with intelligent automation, suggestions from previous cases and calendar management to reminders and case summaries.</p>
              </div>
              <div className="feature-item">
                <FaSearch />
                <h3>Similar Case Finder</h3>
                <p>Connect your case to comparable precedents and statutes with concise summaries to strengthen legal arguments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist removed as requested */}
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-about">
            <h3>NEUR</h3>
            <p>NEUR empowers justice‑minded advocates with transparent data analytics to create fairer sentencing outcomes.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <div className={`modal ${signupOpen ? "" : "hidden"}`} role="dialog" aria-hidden={!signupOpen}>
        <div className="modal-content">
          <button className="modal-close" aria-label="Close signup form" onClick={() => setSignupOpen(false)}>&times;</button>
          <h3>Join Waitlist</h3>
          <form onSubmit={onSignup}>
            <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
            <button type="submit" className="btn btn-primary">Join Waitlist</button>
            <p className="form-message" aria-live="polite">{signupMsg}</p>
          </form>
        </div>
      </div>
    </>
  );
}
