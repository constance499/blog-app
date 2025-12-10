import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container my-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">Contact</h2>
        <p className="text-muted">Get in touch with us for inquiries or support.</p>
      </div>

      {/* ===== CONTACT INFO (ICONS) ===== */}
      <div className="row text-center mb-5 g-4">

        <div className="col-md-4">
          <div className="p-4 bg-white shadow-sm rounded h-100">
            <FaMapMarkerAlt size={32} className="text-primary mb-3" />
            <h6 className="fw-bold">Location</h6>
            <p className="text-muted mb-0">Ikorodu, Lagos, Nigeria</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-white shadow-sm rounded h-100">
            <FaEnvelope size={32} className="text-primary mb-3" />
            <h6 className="fw-bold">Email</h6>
            <p className="text-muted mb-0">contact@example.com</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-white shadow-sm rounded h-100">
            <FaPhoneAlt size={32} className="text-primary mb-3" />
            <h6 className="fw-bold">Phone</h6>
            <p className="text-muted mb-0">+234 704 056 7606</p>
          </div>
        </div>

      </div>

      {/* ===== MAP + CONTACT FORM ===== */}
      <div className="row g-4">

        {/* LEFT: GOOGLE MAP */}
        <div className="col-lg-6">
          <div className="rounded overflow-hidden shadow-sm">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7922.677509179659!2d3.506086889741975!3d6.616306087194977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93dd1c9cba25%3A0xab8a9d0b0e1c1b3e!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1705080000000!5m2!1sen!2sng"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="col-lg-6">
          <div className="p-4 shadow-sm rounded bg-white h-100">
            <h5 className="fw-bold mb-3">Send us a message</h5>

            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Subject"
                required />

              <textarea
                className="form-control mb-3"
                rows="5"
                placeholder="Message"
                required
              ></textarea>

              <button className="btn btn-primary w-100" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;
