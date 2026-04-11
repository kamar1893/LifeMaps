import { Link, useLocation } from "react-router-dom";
import { Home, Compass, User, LogIn, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { currentUser } from "../data/mockData";

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const desktopLinkStyle = (path: string): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
    color: isActive(path) ? "#a5b4fc" : "#9ca3af",
    background: isActive(path) ? "rgba(99,102,241,0.15)" : "transparent",
  });

  const mobileLinkStyle = (path: string): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    textDecoration: "none",
    color: isActive(path) ? "#a5b4fc" : "#9ca3af",
    fontSize: "12px",
  });

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          background: "rgba(8,10,20,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #14b8a6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapPin size={16} color="#ffffff" />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "22px",
              color: "#ffffff",
            }}
          >
            LifeMaps
          </span>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="desktop-nav"
        >
          <Link to="/" style={desktopLinkStyle("/")}>
            <Home size={16} />
            Feed
          </Link>

          <Link to="/explore" style={desktopLinkStyle("/explore")}>
            <Compass size={16} />
            Explore
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/login"
            style={{
              color: "#9ca3af",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LogIn size={18} />
          </Link>

          <Link to={`/profile/${currentUser.username}`}>
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(99,102,241,0.25)",
              }}
            />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          style={{
            position: "sticky",
            top: "64px",
            zIndex: 40,
            background: "rgba(8,10,20,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to="/" style={mobileLinkStyle("/")} onClick={() => setMobileOpen(false)}>
            <Home size={18} />
            Feed
          </Link>

          <Link
            to="/explore"
            style={mobileLinkStyle("/explore")}
            onClick={() => setMobileOpen(false)}
          >
            <Compass size={18} />
            Explore
          </Link>

          <Link
            to={`/profile/${currentUser.username}`}
            style={mobileLinkStyle(`/profile/${currentUser.username}`)}
            onClick={() => setMobileOpen(false)}
          >
            <User size={18} />
            Profile
          </Link>

          <Link
            to="/login"
            style={mobileLinkStyle("/login")}
            onClick={() => setMobileOpen(false)}
          >
            <LogIn size={18} />
            Login
          </Link>
        </div>
      )}
    </>
  );
}