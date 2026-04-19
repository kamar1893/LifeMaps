import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MomentCard } from "../components/MomentCard";
import noImage from "../assets/no-image.jpg";

const CURRENT_USER_ID = "69e40de80167a7c599407fc7"; 

const Profile = () => {
  const { username } = useParams();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/username/${username}`
        );

        const data = await res.json();

        if (!res.ok) {
          setUser(null);
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleFollow = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${user._id}/follow`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUserId: CURRENT_USER_ID,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      setUser((prev: any) => {
        if (!prev) return prev;

        const isNowFollowing = data.message === "Followed";

        return {
          ...prev,
          followers: isNowFollowing
            ? [...prev.followers, CURRENT_USER_ID]
            : prev.followers.filter((id: string) => id !== CURRENT_USER_ID),
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  if (!user) {
    return <h2 style={{ color: "white" }}>User not found</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src={user.profileImage || noImage}
          alt={user.name}
          style={styles.avatar}
        />

        <h1>{user.name}</h1>
        <p>@{user.username}</p>
        <p>{user.bio}</p>

        <button onClick={handleFollow} style={styles.button}>
          Follow / Unfollow
        </button>

        <p>Followers: {user.followers.length}</p>
        <p>Following: {user.following.length}</p>
      </div>
    </div>
  );
};

export default Profile;

const styles: any = {
  page: {
    padding: "40px",
  },
  card: {
    background: "#111",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    textAlign: "center",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#6366f1",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};