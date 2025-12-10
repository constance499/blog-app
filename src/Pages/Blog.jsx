import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter
} from "firebase/firestore";
import { db } from "../../firebase";
import BlogCard from "../Component/BlogCard";
import { collection as subCollection, getDocs as getSubDocs } from "firebase/firestore";

const Blog = () => {
  const pageSize = 6; // posts per page

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);  // stores startAfter docs
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  // 🔥 Load specific page
  const loadPage = async (pageIndex) => {
    setLoading(true);

    let q;

    // Page 1
    if (pageIndex === 0) {
      q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    } else {
      // Other pages
      q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(pages[pageIndex - 1]),
        limit(pageSize)
      );
    }

    const snap = await getDocs(q);

    if (snap.empty) {
      setIsLastPage(true);
      setLoading(false);
      return;
    }

    // Save next page starting point
    const lastVisible = snap.docs[snap.docs.length - 1];

    setPages((prev) => {
      const arr = [...prev];
      arr[pageIndex] = lastVisible;
      return arr;
    });

    // Build posts list
    const newPosts = [];

    for (const docSnap of snap.docs) {
      let postData = { id: docSnap.id, ...docSnap.data(), commentCount: 0 };

      const commentsRef = subCollection(db, "posts", docSnap.id, "comments");
      const cSnap = await getSubDocs(commentsRef);
      postData.commentCount = cSnap.size;

      newPosts.push(postData);
    }

    setPosts(newPosts);
    setCurrentPage(pageIndex);
    setLoading(false);
    setIsLastPage(false);
  };

  useEffect(() => {
    loadPage(0); // load first page
  }, []);

  // 🔥 Go to next page
  const nextPage = () => {
    if (!isLastPage) loadPage(currentPage + 1);
  };

  // 🔥 Go to previous page
  const prevPage = () => {
    if (currentPage > 0) loadPage(currentPage - 1);
  };

  return (
    <div className="container my-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">All Posts</h1>
        <p className="text-muted">A collection of my personal stories and essays.</p>
      </div>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-muted">No posts yet.</p>
      ) : (
        <>
          {/* POSTS */}
          <div className="row g-4">
            {posts.map((post) => (
              <div className="col-lg-4 col-md-6" key={post.id}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="d-flex justify-content-center align-items-center mt-4 gap-2">

            {/* Prev */}
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 0}
              onClick={prevPage}
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="d-flex gap-2">
              {[...Array(currentPage + (isLastPage ? 1 : 2)).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => loadPage(num)}
                  className={`btn btn-sm ${
                    num === currentPage ? "btn-primary" : "btn-outline-primary"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              className="btn btn-outline-primary"
              disabled={isLastPage}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
