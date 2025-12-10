import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword, signInWithPopup, sendEmailVerification, signOut} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import log from "../assets/log.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const loadUserProfile = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      localStorage.setItem("user", JSON.stringify(userData)); 
      console.log("User loaded:", userData);
    }
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // BLOCK LOGIN IF EMAIL NOT VERIFIED
      if (!user.emailVerified) {
        await sendEmailVerification(user, {
          url: "https://humberto-polycarpellary-annamaria.ngrok-free.dev/login",
          handleCodeInApp: true,
        });

        alert(`A new verification email has been sent to ${user.email}. Please verify before logging in.`);
        await signOut(auth);
        return;
      }

       await loadUserProfile(user.uid);

      alert("Login successful!");
      navigate("/create");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider); 
    await loadUserProfile(result.user.uid);

    alert("Login successful!");
    navigate("/create");
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div className="container-fluid align-items-center vh-100 justify-content-center d-flex bg-light">
      <div className="row w-100 h-100 shadow-lg rounded-4 overflow-hidden">

        <div className="col-md-6 bg-white p-5">
          <h3 className="fw-bold mb-3">Login</h3>
          <p className="text-muted mb-4">
            Login to access your <b>travelwise</b> account
          </p>

          <form onSubmit={handleLogin}>
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
                className="form-control pe-5"
                placeholder="password"
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

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <input type="checkbox" className="form-check-input me-2" />
                <label className="form-check-label small">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-danger small text-decoration-none">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold mb-3">
              Login
            </button>
          </form>

          <p className="text-center small">
            Dont have an account?{" "}
            <Link to="/signup" className="text-primary fw-semibold text-decoration-none">
              Sign up
            </Link>
          </p>

          <div className="btn row d-flex justify-content-center">
            {/* GOOGLE */}
            <div className="col-md-6 text-center">
              <button
                className="btn btn-outline-primary w-75 d-flex align-items-center justify-content-center gap-2"
                onClick={() => handleSocialLogin(googleProvider)}
              >
                <FcGoogle size={20} /> Login with Google
              </button>
            </div>

            {/* FACEBOOK */}
            <div className="col-md-6 text-center">
              <button
                className="btn btn-outline-primary w-75 d-flex align-items-center justify-content-center gap-2"
                onClick={ () => (facebookProvider)}
              >
                <FaFacebook size={20} /> Login with Facebook
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
          <img src={log} alt="Login visual" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Login;
