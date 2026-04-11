import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Send, PenLine } from "lucide-react";
import { MomentCard } from "../components/MomentCard";
import { CategoryBadge } from "../components/CategoryBadge";
import {
  moments as initialMoments,
  users,
  currentUser,
  allCategories,
  type StoryCategory,
} from "../data/mockData";

const Index = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<StoryCategory>("Adventure");
  const [story, setStory] = useState("");
  const [location, setLocation] = useState("");
  const [feedMoments, setFeedMoments] = useState(initialMoments);

  const recommendedCreators = users
    .filter((u) => u.id !== currentUser.id)
    .slice(0, 4);

  const handleCreateMoment = () => {
    if (!story.trim() || !location.trim()) {
      alert("Please enter both location and story.");
      return;
    }

    const newMoment = {
      id: `m${Date.now()}`,
      userId: currentUser.id,
      title:
        story.trim().split(" ").slice(0, 4).join(" ") || "New Moment",
      story: story.trim(),
      location: location.trim(),
      date: new Date().toLocaleDateString(),
      category: selectedCategory,
      likes: 0,
      liked: false,
      comments: [],
      timestamp: "Just now",
      gradient: "story",
    };

    setFeedMoments([newMoment, ...feedMoments]);
    setStory("");
    setLocation("");
    setSelectedCategory("Adventure");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "90px 16px 40px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: 1, maxWidth: "760px", display: "grid", gap: "24px" }}>
          <div
            style={{
              borderRadius: "20px",
              padding: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(99,102,241,0.25)",
                }}
              />
              <h2 style={{ margin: 0, fontSize: "18px" }}>Pin a moment</h2>
              <PenLine size={16} color="#a5b4fc" />
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transform: selectedCategory === cat ? "scale(1.05)" : "scale(1)",
                    opacity: selectedCategory === cat ? 1 : 0.7,
                  }}
                >
                  <CategoryBadge category={cat} size="sm" />
                </button>
              ))}
            </div>

            <div style={{ position: "relative", marginBottom: "12px" }}>
              <MapPin
                size={16}
                color="#9ca3af"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                placeholder="Where did this happen?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "12px 14px 12px 38px",
                  fontSize: "14px",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.08)",
                  outline: "none",
                }}
              />
            </div>

            <textarea
              placeholder="Tell your story..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "12px 14px",
                fontSize: "14px",
                color: "white",
                border: "1px solid rgba(255,255,255,0.08)",
                outline: "none",
                resize: "none",
                height: "90px",
                marginBottom: "12px",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleCreateMoment}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(99,102,241,0.18)",
                  color: "#c7d2fe",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <Send size={16} />
                Share Moment
              </button>
            </div>
          </div>

          {feedMoments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} />
          ))}
        </div>

        <aside style={{ width: "290px", display: "grid", gap: "24px" }}>
          <div
            style={{
              borderRadius: "20px",
              padding: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "16px",
                fontSize: "18px",
              }}
            >
              Trending Places
            </h3>

            <div style={{ display: "grid", gap: "12px" }}>
              {[
                { name: "Kyoto, Japan", count: 234 },
                { name: "Lisbon, Portugal", count: 189 },
                { name: "Prague, Czech Republic", count: 156 },
              ].map((loc) => (
                <div
                  key={loc.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.82)" }}>
                    {loc.name}
                  </span>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                    {loc.count} stories
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderRadius: "20px",
              padding: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "16px",
                fontSize: "18px",
              }}
            >
              Storytellers to Follow
            </h3>

            <div style={{ display: "grid", gap: "14px" }}>
              {recommendedCreators.map((user) => (
                <Link
                  key={user.id}
                  to={`/profile/${user.username}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "white",
                      }}
                    >
                      {user.displayName}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: "12px",
                        color: "#9ca3af",
                      }}
                    >
                      {user.followers} followers
                    </p>
                  </div>

                  <button
                    type="button"
                    style={{
                      fontSize: "12px",
                      padding: "6px 10px",
                      borderRadius: "999px",
                      background: "rgba(99,102,241,0.18)",
                      color: "#c7d2fe",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Follow
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;