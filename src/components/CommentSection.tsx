import { useState } from "react";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserById } from "../data/mockData";

interface CommentItem {
  id: string | number;
  userId: string | number;
  text: string;
  timestamp: string;
}

interface CommentSectionProps {
  comments: CommentItem[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {comments.map((comment) => {
        const user = getUserById(comment.userId);
        if (!user) return null;

        return (
          <div key={comment.id} style={{ display: "flex", gap: "10px" }}>
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.avatar}
                alt={user.displayName}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginTop: "2px",
                }}
              />
            </Link>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  to={`/profile/${user.username}`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                >
                  {user.displayName}
                </Link>

                <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                  {comment.timestamp}
                </span>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.75)",
                  margin: "4px 0 0",
                }}
              >
                {comment.text}
              </p>
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Share a thought..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.08)",
            borderRadius: "999px",
            padding: "10px 14px",
            fontSize: "14px",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.12)",
            outline: "none",
          }}
        />
        <button
          type="button"
          style={{
            padding: "10px",
            borderRadius: "999px",
            background: "rgba(99,102,241,0.18)",
            color: "#a5b4fc",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}