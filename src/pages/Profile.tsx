import { useParams } from "react-router-dom";
import { useState } from "react";
import { getUserByUsername, getMomentsByUserId } from "../data/mockData";
import { MomentCard } from "../components/MomentCard";

const Profile = () => {
  const { username } = useParams();
  const user = getUserByUsername(username || "");

  if (!user) {
    return (
      <div style={styles.notFoundWrapper}>
        <h2 style={{ color: "white" }}>User not found</h2>
      </div>
    );
  }

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user.followers);

  const moments = getMomentsByUserId(user.id);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
    } else {
      setFollowersCount((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <img src={user.avatar} alt={user.displayName} style={styles.avatar} />

          <h1 style={styles.name}>{user.displayName}</h1>
          <p style={styles.username}>@{user.username}</p>
          <p style={styles.bio}>{user.bio}</p>

          <button
            onClick={handleFollowToggle}
            style={{
              ...styles.button,
              background: isFollowing ? "#374151" : "#6366f1",
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <b style={styles.statNumber}>{followersCount}</b>
              <p style={styles.statLabel}>Followers</p>
            </div>

            <div style={styles.statBox}>
              <b style={styles.statNumber}>{user.following}</b>
              <p style={styles.statLabel}>Following</p>
            </div>

            <div style={styles.statBox}>
              <b style={styles.statNumber}>{moments.length}</b>
              <p style={styles.statLabel}>Posts</p>
            </div>
          </div>
        </div>

        <div style={styles.feedWrapper}>
          <h2 style={styles.sectionTitle}>Moments</h2>

          {moments.length === 0 ? (
            <p style={styles.emptyText}>No moments shared yet.</p>
          ) : (
            moments.map((m) => <MomentCard key={m.id} moment={m} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const styles = {
  page: {
    minHeight: "100vh",
    padding: "90px 20px 40px",
    background: "transparent",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    background: "rgba(17, 24, 39, 0.9)",
    color: "white",
    padding: "28px 24px",
    borderRadius: "20px",
    textAlign: "center" as const,
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  avatar: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    objectFit: "cover" as const,
    border: "3px solid rgba(99,102,241,0.35)",
    marginBottom: "14px",
  },
  name: {
    margin: "0 0 6px",
    color: "white",
    fontSize: "30px",
    fontWeight: 700,
  },
  username: {
    margin: "0 0 10px",
    color: "#9ca3af",
    fontSize: "14px",
  },
  bio: {
    margin: "0 auto 16px",
    color: "rgba(255,255,255,0.78)",
    maxWidth: "500px",
    lineHeight: 1.6,
  },
  button: {
    marginTop: "8px",
    padding: "10px 18px",
    border: "none",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    marginTop: "24px",
    flexWrap: "wrap" as const,
  },
  statBox: {
    minWidth: "90px",
  },
  statNumber: {
    display: "block",
    fontSize: "22px",
    color: "white",
  },
  statLabel: {
    margin: "4px 0 0",
    color: "#9ca3af",
    fontSize: "13px",
  },
  feedWrapper: {
    marginTop: "24px",
    display: "grid",
    gap: "20px",
  },
  sectionTitle: {
    color: "white",
    margin: "0 0 6px",
  },
  emptyText: {
    color: "#9ca3af",
  },
  notFoundWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};