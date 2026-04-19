import { useEffect, useState } from "react";
import { Heart, MessageCircle, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryStyles } from "../data/mockData";
import { CategoryBadge } from "./CategoryBadge";
import noImage from "../assets/no-image.jpg";

interface MomentCardProps {
  moment: any;
  onLike?: () => void;
}

export function MomentCard({ moment, onLike }: MomentCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>(moment.comments || []);
  const [commentText, setCommentText] = useState("");

  const user = moment.backendUser || {
    username: "unknown",
    displayName: "Unknown User",
    avatar: noImage,
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${moment._id}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setComments(
          data.map((comment: any, index: number) => ({
            id: comment._id || index,
            userName: comment.user?.name || "Unknown User",
            text: comment.text,
            timestamp: comment.createdAt
              ? new Date(comment.createdAt).toLocaleString()
              : "Just now",
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: moment._id,
          text: commentText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add comment");
        return;
      }

      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      }}
    >
      {moment.image && (
        <img
          src={moment.image}
          alt={moment.title}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = noImage;
          }}
        />
      )}

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
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = noImage;
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
            onClick={onLike}
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
            <Heart size={18} />
            <span style={{ fontSize: "14px" }}>{moment.likes}</span>
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
            <span style={{ fontSize: "14px" }}>{comments.length}</span>
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
          <div style={{ display: "grid", gap: "12px", marginBottom: "14px" }}>
            {comments.length === 0 ? (
              <p style={{ color: "#9ca3af", margin: 0 }}>No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "10px 12px",
                  }}
                >
                  <p style={{ margin: "0 0 6px", color: "white", fontWeight: 600 }}>
                    {comment.userName}
                  </p>
                  <p style={{ margin: "0 0 6px", color: "#d1d5db" }}>
                    {comment.text}
                  </p>
                  <p style={{ margin: 0, color: "#9ca3af", fontSize: "12px" }}>
                    {comment.timestamp}
                  </p>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={handleAddComment}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                background: "#6366f1",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}