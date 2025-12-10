import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function NavigationHero() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-2">
        <div className="container">
          <Link className="navbar-brand fw-bold " to="/">
            MyBlog
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu" >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navMenu">
            <ul className="navbar-nav align-items-center gap-3 ">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Post</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            <div className="d-flex ms-lg-4 gap-2">
              <Link className="btn btn-primary px-3" to="/signup">Signup</Link>
              <Link className="btn btn-outline-light px-3" to="/login">Login</Link>
            </div>
          </div>
        </div>
      </nav>
    </>)
}