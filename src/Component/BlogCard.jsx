import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover", width: "100%" }}
        />
      ) : (
        <div
          style={{
            height: "200px",
            backgroundColor: post.backgroundColor || "#888",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            padding: "10px",
            width: "100%",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {post.content ? post.content.slice(0, 100) : "No Image"}
        </div>
      )}

      {/* Card body */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text flex-grow-1">
          {post.content.length > 100
            ? post.content.slice(0, 100) + "..."
            : post.content}
        </p>
        <p className="text-muted small mb-2">Author: {post.authorName}</p>
        <p className="text-muted small mb-2">
          Comments: <span className="fw-bold">{post.commentCount || 0}</span>
        </p>
        <Link
          to={`/post/${post.id}`}
          className="btn btn-outline-primary btn-sm mt-auto align-self-start"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
