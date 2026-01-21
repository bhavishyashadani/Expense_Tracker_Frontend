// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [userName, setUserName] = useState("");
//   const [pass, setPass] = useState("");
//   const navigate = useNavigate();

//   async function handleLogin() {
//     try {
//       const res = await api.post("/auth/signin", { userName, pass });
//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   }

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>

//       <input placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />

//       <button className="primary" onClick={handleLogin}>
//         Login
//       </button>
//       <a href="/signup">signup</a>
//     </div>
//   );
// }
import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom"; 
import "../Style/Auth.css"; // Make sure to import the CSS

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault(); // Prevents page reload
    if (!userName || !pass) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/signin", { userName, pass });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      //console.log(res);
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div>
            <input 
              className="auth-input"
              placeholder="Username" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)} 
              required
            />
          </div>
          
          <div>
            <input 
              className="auth-input"
              type="password" 
              placeholder="Password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)} 
              required
            />
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? 
          {/* Using Link is faster than <a href> in React */}
          <Link to="/signup" className="auth-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
}