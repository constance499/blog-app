import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import log from "../assets/log.png";
import { signOut } from "firebase/auth";  

function SignUp() {
  const [fullName, setFullName] = useState("");     
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

       const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: fullName,
        email: email,
        profileImage: "",
        dateCreated: new Date(),
      });
      await sendEmailVerification(userCredential.user, {
        url: "https://humberto-polycarpellary-annamaria.ngrok-free.dev/login",
        handleCodeInApp: true,
      });

      alert(`A verification link has been sent to ${userCredential.user.email}. Please verify before logging in.`);
      await signOut(auth);

      setFullName("");
      setEmail("");
      setPassword("");

      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid align-items-center vh-100 justify-content-center d-flex bg-light">
      <div className="row w-100 h-100 shadow-lg rounded-4 overflow-hidden">

        <div className="col-md-6 bg-white p-5">
          <h3 className="fw-bold mb-3">Create an account</h3>
          <p className="text-muted mb-4">
            Sign up to access your <b>TravelWise</b> account
          </p>

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="form-control pe-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "55%",
                  transform: "translate(-50%)",
                  cursor: "pointer",
                  color: "#6c757d",
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className="d-flex justify-content-center align-items-center mb-3">
              <div>
                <input type="checkbox" className="form-check-input me-2" id="remember" />
                <label htmlFor="remember" className="form-check-label small">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold mb-3"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center small">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Login
            </Link>
          </p>
        </div>

        <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
          <img src={log} alt="My asset" className="img-fluid" />
        </div>

      </div>
    </div>
  );
}

export default SignUp;
