import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: "48px", margin: 0 }}>404</h1>
      <p style={{ color: "#cbd5e1" }}>Page not found</p>
      <Link
        to="/"
        style={{
          padding: "10px 18px",
          background: "#6366f1",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;