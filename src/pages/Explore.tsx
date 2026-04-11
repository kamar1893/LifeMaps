import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Users, Sparkles, MapPin } from "lucide-react";
import { CategoryBadge } from "../components/CategoryBadge";
import { MomentCard } from "../components/MomentCard";
import {
  allCategories,
  type StoryCategory,
  moments,
  users,
  trendingLocations,
} from "../data/mockData";

const Explore = () => {
  const [activeFilter, setActiveFilter] =
    useState<StoryCategory | "All">("All");

  const filteredMoments =
    activeFilter === "All"
      ? moments
      : moments.filter((m) => m.category === activeFilter);

  const featuredCreators = [...users]
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 6);

  return (
    <div style={{ minHeight: "100vh", padding: "90px 16px 40px" }}>
      <div
  style={{
    width: "100%",
    display: "grid",
    gap: "32px",
    padding: "0 24px",
    boxSizing: "border-box",
  }}
>
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "42px",
              color: "white",
            }}
          >
            Explore <span style={{ color: "#a5b4fc" }}>Stories</span>
          </h1>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "#9ca3af",
              lineHeight: 1.7,
            }}
          >
            Discover moments from around the world, connect with storytellers,
            and find places that resonate.
          </p>
        </div>

        <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto", width: "100%" }}>
          <Search
            size={16}
            color="#9ca3af"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            placeholder="Search places, stories, people..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "999px",
              padding: "14px 16px 14px 42px",
              fontSize: "14px",
              color: "white",
              border: "1px solid rgba(255,255,255,0.08)",
              outline: "none",
            }}
          />
        </div>

        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <MapPin size={18} color="#f97316" />
            <h2 style={{ margin: 0, fontSize: "20px" }}>Trending Locations</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {trendingLocations.map((loc) => (
              <div
                key={loc.name}
                style={{
                  borderRadius: "16px",
                  padding: "16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "white",
                  }}
                >
                  {loc.name}
                </p>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    color: "#9ca3af",
                  }}
                >
                  {loc.count} stories
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <TrendingUp size={18} color="#a5b4fc" />
            <h2 style={{ margin: 0, fontSize: "20px" }}>Browse by Category</h2>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveFilter("All")}
              type="button"
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background:
                  activeFilter === "All"
                    ? "rgba(99,102,241,0.18)"
                    : "rgba(255,255,255,0.08)",
                color: activeFilter === "All" ? "#c7d2fe" : "#9ca3af",
                fontWeight: 600,
              }}
            >
              <Sparkles size={12} style={{ marginRight: "6px", verticalAlign: "middle" }} />
              All
            </button>

            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                type="button"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transform: activeFilter === cat ? "scale(1.05)" : "scale(1)",
                  opacity: activeFilter === cat ? 1 : 0.8,
                }}
              >
                <CategoryBadge category={cat} />
              </button>
            ))}
          </div>
        </section>

        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <Users size={18} color="#a5b4fc" />
            <h2 style={{ margin: 0, fontSize: "20px" }}>Featured Storytellers</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            {featuredCreators.map((user) => (
              <Link
                key={user.id}
                to={`/profile/${user.username}`}
                style={{
                  borderRadius: "18px",
                  padding: "16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(99,102,241,0.2)",
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {user.displayName}
                </p>
                <CategoryBadge category={user.favoriteCategory} size="sm" />
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#9ca3af",
                  }}
                >
                  {user.followers.toLocaleString()} followers
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>Discover Moments</h2>
          <div style={{ display: "grid", gap: "24px" }}>
            {filteredMoments.map((moment) => (
              <MomentCard key={moment.id} moment={moment} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;