import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          location,
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create post");
        return;
      }

      alert("Post created!");
      navigate("/explore");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Create Post</h1>

      <form onSubmit={submitHandler} style={{ maxWidth: "500px" }}>
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "16px" }}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "16px" }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "16px" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            background: "#ff5757",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;