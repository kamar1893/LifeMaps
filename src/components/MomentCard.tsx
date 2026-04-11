import { useState } from "react";
import { Heart, MessageCircle, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserById, categoryStyles } from "../data/mockData";
import { CategoryBadge } from "./CategoryBadge";
import { CommentSection } from "./CommentSection";

interface CommentItem {
  id: string | number;
  userId: string | number;
  text: string;
  timestamp: string;
}

interface Moment {
  id: string | number;
  userId: string | number;
  category: keyof typeof categoryStyles;
  liked: boolean;
  likes: number;
  comments: CommentItem[];
  gradient?: string;
  location: string;
  date?: string;
  title: string;
  story: string;
  timestamp: string;
}

interface MomentCardProps {
  moment: Moment;
}

export function MomentCard({ moment }: MomentCardProps) {
  const [liked, setLiked] = useState(moment.liked);
  const [likeCount, setLikeCount] = useState(moment.likes);
  const [showComments, setShowComments] = useState(false);

  const user = getUserById(moment.userId);
  if (!user) return null;

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        border: liked
          ? "1px solid rgba(99,102,241,0.35)"
          : "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        backdropFilter: "blur(12px)",
        boxShadow: liked
          ? "0 0 20px rgba(99,102,241,0.15)"
          : "0 8px 30px rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.avatar}
              alt={user.displayName}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(99,102,241,0.2)",
              }}
            />
          </Link>

          <div style={{ flex: 1, minWidth: 0 }}>
            <Link
              to={`/profile/${user.username}`}
              style={{
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              {user.displayName}
            </Link>

            <div
              style={{
                display: "flex",
                gap: "8px",
                fontSize: "12px",
                color: "#9ca3af",
                flexWrap: "wrap",
              }}
            >
              <span>@{user.username}</span>
              <span>·</span>
              <span>{moment.timestamp}</span>
            </div>
          </div>

          <CategoryBadge category={moment.category} size="sm" />
        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "12px",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#a5b4fc",
              fontWeight: 500,
            }}
          >
            <MapPin size={14} />
            <span>{moment.location}</span>
          </div>

          {moment.date && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#9ca3af",
              }}
            >
              <Calendar size={14} />
              <span>{moment.date}</span>
            </div>
          )}
        </div>

        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 10px",
          }}
        >
          {moment.title}
        </h3>

        <p
          style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: "14px",
            lineHeight: 1.7,
            margin: "0 0 18px",
          }}
        >
          {moment.story}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <button
            onClick={toggleLike}
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: liked ? "#f97316" : "#9ca3af",
            }}
          >
            <Heart
              size={18}
              style={{
                fill: liked ? "#f97316" : "transparent",
                transition: "0.2s",
              }}
            />
            <span style={{ fontSize: "14px" }}>{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments((prev) => !prev)}
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
            }}
          >
            <MessageCircle size={18} />
            <span style={{ fontSize: "14px" }}>{moment.comments.length}</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            padding: "16px",
          }}
        >
          <CommentSection comments={moment.comments} />
        </div>
      )}
    </div>
  );
}