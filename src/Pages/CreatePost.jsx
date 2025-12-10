import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bgColor] = useState(getRandomColor());
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  function getRandomColor() {
    const colors = ["#3b5998", "#ff6f61", "#2ecc71", "#9b59b6", "#f39c12"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Protect route BEFORE page loads
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/signup"); // redirect user
      }
      setCheckingAuth(false); // allow page to load
    });

    return () => unsub();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <p className="text-center mt-5 fw-bold">
        Checking authentication…
      </p>
    );
  }

  // Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog_uploads");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dv6hueylj/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // EXTRA SECURITY: Block submission if no user
    if (!auth.currentUser) {
      alert("You must be logged in to create a post.");
      return navigate("/signup");
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        coverImage: imageUrl || null,
        backgroundColor: imageUrl ? null : bgColor,
        createdAt: serverTimestamp(),
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.email,
      });

      alert("Post created!");
      navigate("/blog");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h2 className="fw-bold mb-4">Create New Post</h2>

      <label className="btn btn-secondary mb-3">
        Upload Optional Image
        <input type="file" hidden onChange={handleImageUpload} />
      </label>

      {imageUrl ? (
        <img
          src={imageUrl}
          className="img-fluid rounded mb-3"
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="rounded mb-3 d-flex align-items-center justify-content-center"
          style={{
            minHeight: "200px",
            backgroundColor: bgColor,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {content ? content.slice(0, 100) : "Preview here"}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-3"
          rows="6"
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <button className="btn btn-dark w-100">Publish Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
