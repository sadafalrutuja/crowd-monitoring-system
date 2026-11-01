// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase/firebase";
// import "../styles/Login.css";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email.trim() || !password) {
//       setError("Please enter your email address and password.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await signInWithEmailAndPassword(
//         auth,
//         email.trim(),
//         password
//       );

//       navigate("/", { replace: true });
//     } catch (err) {
//       console.error("Login error:", err);

//       switch (err.code) {
//         case "auth/invalid-email":
//           setError("Please enter a valid email address.");
//           break;

//         case "auth/invalid-credential":
//         case "auth/wrong-password":
//         case "auth/user-not-found":
//           setError("Invalid email or password.");
//           break;

//         case "auth/too-many-requests":
//           setError("Too many attempts. Please try again later.");
//           break;

//         case "auth/network-request-failed":
//           setError("Network error. Please check your internet.");
//           break;

//         default:
//           setError(err.message || "Login failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <section className="login-hero">
//         <div className="login-hero-content">
//           <div className="brand-logo">
//             <img
//               src="/sai.png"
//               alt="Sai Baba"
//               className="sai-logo"
//             />
//           </div>

//           <p className="login-subtitle">SHIRDI • MAHARASHTRA</p>

//           <h1 className="login-hero-title">
//             Sai Baba
//             <br />
//             Crowd Detector
//           </h1>

//           <p className="hero-message">
//             Smart Crowd Monitoring & Security Management System
//           </p>

//           <div className="hero-quote">
//             <span>ॐ साईं राम</span>
//             <p>
//               "Shraddha and Saburi"
//             </p>
//           </div>

//           <div className="hero-tag">
//             REAL-TIME CROWD INTELLIGENCE
//           </div>
//         </div>
//       </section>

//       <section className="login-form-section">
//         <div className="login-card">
//           <div className="login-card-header">
//             <span className="login-icon">ॐ</span>

//             <h2>Welcome Back</h2>

//             <p>
//               Sign in to access the crowd monitoring dashboard.
//             </p>
//           </div>

//           <form onSubmit={handleLogin}>
//             <div className="form-group">
//               <label htmlFor="email">Email Address</label>

//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="username"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>

//               <div className="password-wrapper">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="current-password"
//                   required
//                 />

//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <div className="login-error" role="alert">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="login-button"
//               disabled={loading}
//             >
//               {loading ? "Signing In..." : "Sign In →"}
//             </button>
//           </form>

//           <div className="login-security-note">
//             <span>🔒</span>
//             <span>Secure access for authorized personnel only</span>
//           </div>

//           <div className="login-footer">
//             <span>ॐ Sai Baba Crowd Detector</span>
//             <span>Smart Temple Security</span>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Login


import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      navigate("/", { replace: true });

    } catch (err) {
      console.error("Login error:", err);

      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setError("Invalid email or password.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet.");
          break;

        default:
          setError("Login failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD FUNCTION
  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address first.");
      return;
    }

    try {
      setResetLoading(true);

      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      setSuccess(
        "If an account exists for this email, a password reset link has been sent. Please check your inbox and spam folder."
      );

    } catch (err) {
      console.error("Password reset error:", err);

      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;

        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet.");
          break;

        default:
          setError("Unable to send reset email. Please try again.");
      }

    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT HERO SECTION */}
      <section className="login-hero">

        <div className="login-hero-content">

          <div className="brand-logo">
            <img
              src="/sai.png"
              alt="Sai Baba"
              className="sai-logo"
            />
          </div>

          <p className="login-subtitle">
            SHIRDI • MAHARASHTRA
          </p>

          <h1 className="login-hero-title">
            Sai Baba
            <br />
            Crowd Detector
          </h1>

          <p className="hero-message">
            Smart Crowd Monitoring & Security Management System
          </p>

          <div className="hero-quote">
            <span>ॐ साईं राम</span>

            <p>
              "Shraddha and Saburi"
            </p>
          </div>

          <div className="hero-tag">
            REAL-TIME CROWD INTELLIGENCE
          </div>

        </div>

      </section>

      {/* RIGHT LOGIN SECTION */}
      <section className="login-form-section">

        <div className="login-card">

          <div className="login-card-header">

            <span className="login-icon">ॐ</span>

            <h2>Welcome Back</h2>

            <p>
              Sign in to access the crowd monitoring dashboard.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                autoComplete="username"
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-password-row">

              <button
                type="button"
                className="forgot-password-link"
                onClick={handleForgotPassword}
                disabled={resetLoading}
              >
                {resetLoading
                  ? "Sending reset link..."
                  : "Forgot Password?"}
              </button>

            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="login-success" role="status">
                {success}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>

          </form>

          {/* SECURITY NOTE */}
          <div className="login-security-note">

            <span>🔒</span>

            <span>
              Secure access for authorized personnel only
            </span>

          </div>

          {/* FOOTER */}
          <div className="login-footer">

            <span>ॐ Sai Baba Crowd Detector</span>

            <span>Smart Temple Security</span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Login