import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs,  } from "firebase/firestore";
import { db } from "../../firebase";
import BlogCard from "../Component/BlogCard";
import { Link } from "react-router-dom";
import ImageGrid from "../Component/ImgGrid";
import ExplorePassion from "../Component/ExplorePassion";
import hero2 from '../assets/hero2.jpg'
import footer from '../assets/footer-1.jpg'
import footer3 from '../assets/footer-03.jpg'
const Home =() =>{
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("category", "==", "Personal"),
          where("published", "==", true),
          orderBy("createdAt", "desc"),
          limit(6)
        );
        const snap = await getDocs(q);
        const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRecentPosts(arr);
      } catch (err) {
        console.error("Home fetch error:", err);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <>
    <div>
      {/* HERO CAROUSEL */}
<div id="homeHeroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner">

    {/* Slide 1 */}
    <div className="carousel-item active" style={{
      height: '80vh',
      backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="d-flex align-items-center justify-content-center h-100 text-center text-white">
        <div className="container">
          <h1 className="display-3 fw-bold">Thoughts, Stories & Ideas</h1>
          <p className="lead mb-4">Personal essays and reflections — straight from my notebook.</p>
          <Link to="/blog" className="btn btn-light btn-lg px-4 py-3">Browse Articles</Link>
        </div>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="carousel-item" style={{
      height: '80vh',
      backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="d-flex align-items-center justify-content-center h-100 text-center text-white">
        <div className="container">
          <h1 className="display-3 fw-bold">Express Your Voice</h1>
          <p className="lead mb-4">Write, create, and share your best thoughts.</p>
          <Link to="/create" className="btn btn-primary btn-lg px-4 py-3">Create a Post</Link>
        </div>
      </div>
    </div>

    {/* Slide 3 */}
    <div className="carousel-item" style={{
      height: '80vh',
      backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="d-flex align-items-center justify-content-center h-100 text-center text-white">
        <div className="container">
          <h1 className="display-3 fw-bold">Share Your Story</h1>
          <p className="lead mb-4">Inspire others with your personal experiences and ideas.</p>
          <Link to="/create" className="btn btn-primary btn-lg px-4 py-3">Start Writing</Link>
        </div>
      </div>
    </div>

  </div>

  {/* Carousel Controls */}
  <button className="carousel-control-prev" type="button" data-bs-target="#homeHeroCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#homeHeroCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</div>

      <div>
        <ImageGrid/>
      </div>
       <section>
        <ExplorePassion/>
       </section>
      {/* Latest Posts */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 fw-bold m-0">Latest Posts</h2>
          <Link to="/blog" className="small text-muted">See all posts →</Link>
        </div>

        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : recentPosts.length === 0 ? (
          <p className="text-center text-muted">No posts yet. Create your first story!</p>
        ) : (
          <div className="row g-4">
            {recentPosts.map((post) => (
              <div className="col-lg-4 col-md-6" key={post.id}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Subscribe / CTA */}
      <section className="bg-dark py-3">
  <div className="py-5">
    {/* Four stacked images */}
    <img className="img-fluid mb-3" src={hero2} alt="Hero 1" />
    <img className="img-fluid mb-3" src={footer} alt="Footer 1" />
    <img className="img-fluid mb-3" src={footer3} alt="Footer 2" />
    <img className="img-fluid mb-3" src={footer} alt="Footer 3" />
  </div>

  <div className="container text-center text-light">
    <h3 className="fw-bold">Join my newsletter</h3>
    <p className="text-muted mb-3">Get new posts and writing updates directly to your inbox.</p>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value.trim();
        if (!email) return;
        try {
          // Your addDoc logic here
        } catch (err) {
          console.error(err);
        }
        e.target.reset();
        alert("Thanks — you are subscribed!");
      }}
      className="d-flex justify-content-center gap-2 flex-wrap"
    >
      <input
        name="email"
        type="email"
        className="form-control w-50"
        placeholder="Your email"
        required
      />
      <button className="btn btn-dark">Subscribe</button>
    </form>
  </div>
</section>

    </div>
    </>
  );
}
export default Home;