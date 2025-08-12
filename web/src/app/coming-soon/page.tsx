export default function ComingSoon() {
  return (
    <main className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: ".75rem" }}>Thanks for signing up!</h1>
        <p style={{ color: "var(--color-muted)", maxWidth: 700, margin: "0 auto 1rem" }}>
          Your account was created. Please check your email to confirm your address. We’ll notify you as soon as the platform launches.
        </p>
      </div>
    </main>
  );
}


