
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaSuitcase, FaLaptopCode, FaHeartbeat } from "react-icons/fa";

export default function ExplorePassions() {
  const navigate = useNavigate();

  const passions = [
    { title: "Marketing", desc: "Elevate your skills with proven strategies and industry secrets.", icon: <FaChartLine /> },
    { title: "Travel", desc: "Uncover hidden gems and travel tips for your next adventure.", icon: <FaSuitcase /> },
    { title: "Technology", desc: "Stay ahead with the latest tech trends and insights.", icon: <FaLaptopCode /> },
    { title: "Wellness", desc: "Embrace health and balance in everyday life.", icon: <FaHeartbeat /> },
  ];

 

  return (
    <section className="container my-5 explore-section">

      <h2 className="text-center mb-4">Explore My Passions</h2>

      <div className="row g-4">
        {passions.map((p, i) => (
          <div key={i} className="col-md-6">
            <div className="passion-card" onClick={() => openCategory(p.title)}>
              
              <div className="passion-icon">{p.icon}</div>

              <h4>{p.title}</h4>
              <p>{p.desc}</p>

            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/blog")}
          className="btn btn-primary px-4"
        >
          VIEW ALL BLOGS
        </button>
      </div>

    </section>
  );
}
