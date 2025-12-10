import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import {  doc, getDoc, deleteDoc, collection, addDoc,
  serverTimestamp, onSnapshot, orderBy, query} from "firebase/firestore";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // COMMENTS
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
 const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      }

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const commentsRef = collection(db, "posts", id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentData);
    });

    return () => unsubscribe();
  }, [id]);

  // 🔥 ADD COMMENT
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("You must be logged in.");

    if (commentInput.trim() === "") return;

    await addDoc(collection(db, "posts", id, "comments"), {
      userId: auth.currentUser.uid,
      username: auth.currentUser.email,
      text: commentInput,
      createdAt: serverTimestamp(),
    });

    setCommentInput("");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    await deleteDoc(doc(db, "posts", id));
    alert("Post deleted!");
    navigate("/blog");
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!post) return <p className="text-center mt-5">Post not found</p>;

  const isOwner = auth.currentUser?.uid === post.authorId;

  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      {/* Image or background color */}
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          className="img-fluid rounded mb-4"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="rounded mb-4 d-flex align-items-center justify-content-center"
          style={{
            minHeight: "300px",
            backgroundColor: post.backgroundColor || "#888",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {post.content?.slice(0, 300)}
        </div>
      )}

      <h2 className="fw-bold">{post.title}</h2>
      <p className="text-muted large mb-3">
        By {post.authorName} •{" "}
        {post.createdAt?.toDate
          ? new Date(post.createdAt.toDate()).toLocaleDateString()
          : ""}
      </p>

      <p className="lead">{post.content}</p>

      {isOwner && (
        <div className="mt-4 d-flex gap-3">
          <Link to={`/edit/${post.id}`} className="btn btn-outline-primary">
            Edit
          </Link>
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {/* 🔥 COMMENT SECTION */}
<hr className="my-4" />

<h4 className="fw-bold">Comments ({comments.length})</h4>

{auth.currentUser ? (
  <form onSubmit={handleAddComment} className="mb-4 mt-3">
    <textarea
      className="form-control mb-2"
      placeholder="Write a comment..."
      value={commentInput}
      onChange={(e) => setCommentInput(e.target.value)}
      rows={4} // Bigger box
      style={{ resize: "vertical" }} 
    />
    <button className="btn btn-primary">Post Comment</button>
  </form>
) : (
  <p className="text-muted">Login to write a comment.</p>
)}

{comments.length === 0 ? (
  <p className="text-muted">No comments yet.</p>
) : (
  comments.map((c) => (
    <div
      key={c.id}
      className="mb-3 p-3 bg-light rounded"
      style={{ lineHeight: "1.6", minHeight: "60px" }}
    >
      <strong>{c.username}</strong>
      <p className="mb-1">{c.text}</p>
      <small className="text-muted">
        {c.createdAt?.toDate
          ? new Date(c.createdAt.toDate()).toLocaleString()
          : ""}
      </small>
       {auth.currentUser?.uid === c.userId && (
              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={async () => {
                  await deleteDoc(doc(db, "posts", id, "comments", c.id));
                }}
              >
                Delete
              </button>
            )}
    </div>
  ))
)}

    </div>
  );
};

export default SinglePost;
