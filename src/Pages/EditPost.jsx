import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(""); 
  const [bgColor, setBgColor] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.coverImage || "");
        setBgColor(data.backgroundColor || getRandomColor());
      }
    };
    fetchPost();
  }, [id]);

  // Generate random background color
  function getRandomColor() {
    const colors = ["#3b5998", "#ff6f61", "#2ecc71", "#9b59b6", "#f39c12"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog_uploads"); // your Cloudinary preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dv6hueylj/image/upload",
        { method: "POST", body: formData }
      );
      const result = await res.json();
      setImageUrl(result.secure_url);
      setImage(file); // store file if needed for preview
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Try again.");
    }
  };

  // Handle post update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please add title and content");

    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title,
        content,
        coverImage: imageUrl || null,
        backgroundColor: imageUrl ? null : bgColor,
      });

      alert("Post updated successfully!");
      navigate("/blog");
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Try again.");
    }
  };

  if (!post) return <p className="text-center mt-5">Loading post...</p>;

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h2 className="fw-bold text-center mb-4">Edit Post</h2>

      {/* Image upload */}
      <label className="btn btn-secondary mb-3">
        Change Image (optional)
        <input type="file" hidden onChange={handleImageUpload} />
      </label>

      {/* Preview */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="img-fluid rounded mb-3"
          style={{ maxHeight: "350px", objectFit: "cover", width: "100%" }}
        />
      ) : (
        <div
          className="rounded mb-3 d-flex align-items-center justify-content-center"
          style={{
            minHeight: "200px",
            backgroundColor: bgColor,
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            padding: "15px",
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {content ? content.slice(0, 100) : "No image uploaded. Preview will appear here."}
        </div>
      )}

      <form onSubmit={handleUpdate}>
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

        <button className="btn btn-dark w-100">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
