import '../App.css'

import hero from "../assets/hero.jpg";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";

export default function ImageGrid() {
  return (
    <section className="image-grid-section container my-5">

      <div className="row g-4">

        {/* LEFT IMAGE */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="image-wrapper normal-img">
            <img src={hero} className="grid-img" alt="left" />
          </div>
        </div>

        {/* MIDDLE TALL IMAGE */}
        <div className="col-lg-4 col-md-6 col-12">
          <div className="image-wrapper tall-img">
            <img src={hero1} className="grid-img" alt="middle" />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-lg-4 col-md-12 col-12">
          <div className="image-wrapper normal-img">
            <img src={hero2} className="grid-img" alt="right" />
          </div>
        </div>

      </div>
    </section>
  );
}
