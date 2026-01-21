// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [form, setForm] = useState({
//     uname: "",
//     userName: "",
//     pass: "",
//     cashBalance: "",
//     onlineBalance: "",
//     monthlyBudget: ""
//   });

//   const navigate = useNavigate();

//   function handleChange(e) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   }

//   async function handleSignup() {
//     try {
//       await api.post("/auth/signup", {
//         ...form,
//         cashBalance: Number(form.cashBalance),
//         onlineBalance: Number(form.onlineBalance),
//         monthlyBudget: Number(form.monthlyBudget)
//       });
//       navigate("/login");
//     } catch (err) {
//       alert("Signup failed");
//     }
//   }

//   return (
//     <div className="auth-container">
//       <h2>Signup</h2>

//       <input name="uname" placeholder="Name" onChange={handleChange} />
//       <input name="userName" placeholder="Username" onChange={handleChange} />
//       <input name="pass" type="password" placeholder="Password" onChange={handleChange} />
//       <input name="cashBalance" placeholder="Cash Balance" onChange={handleChange} />
//       <input name="onlineBalance" placeholder="Online Balance" onChange={handleChange} />
//       <input name="monthlyBudget" placeholder="Monthly Budget" onChange={handleChange} />

//       <button className="primary" onClick={handleSignup}>
//         Signup
//       </button>
//     </div>
//   );
// }
import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../Style/Auth.css"; // Reuse the same CSS file

export default function Signup() {
  const [form, setForm] = useState({
    uname: "",
    userName: "",
    pass: "",
    cashBalance: "",
    onlineBalance: "",
    monthlyBudget: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSignup(e) {
    e.preventDefault(); // Enable "Enter" key submission
    
    // Basic validation
    if(!form.uname || !form.userName || !form.pass ||!form.cashBalance ||!form.onlineBalance ||!form.monthlyBudget) {
        alert("Please fill in all required fields");
        return;
    }

    setLoading(true);
    try {
      await api.post("/signup", {
        ...form,
        cashBalance: Number(form.cashBalance) || 0,
        onlineBalance: Number(form.onlineBalance) || 0,
        monthlyBudget: Number(form.monthlyBudget) || 0
      });
      navigate("/auth/login");
    } catch (err) {
      alert("Signup failed. Username might be taken.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        
        <form className="auth-form" onSubmit={handleSignup}>
          
          {/* Section 1: User Info */}
          <input 
            className="auth-input" 
            name="uname" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required
          />
          
          <div className="form-row">
            <div>
                <input 
                  className="auth-input" 
                  name="userName" 
                  placeholder="Username" 
                  onChange={handleChange} 
                  required
                />
            </div>
            <div>
                <input 
                  className="auth-input" 
                  name="pass" 
                  type="password" 
                  placeholder="Password" 
                  onChange={handleChange} 
                  required
                />
            </div>
          </div>

          {/* Section 2: Financial Setup */}
          <div className="form-section-title">Initial Setup</div>

          <div className="form-row">
            <div>
                <input 
                  className="auth-input" 
                  name="cashBalance" 
                  type="number" 
                  placeholder="Cash Balance" 
                  onChange={handleChange} 
                />
            </div>
            <div>
                <input 
                  className="auth-input" 
                  name="onlineBalance" 
                  type="number" 
                  placeholder="Online Balance" 
                  onChange={handleChange} 
                />
            </div>
          </div>

          <input 
            className="auth-input" 
            name="monthlyBudget" 
            type="number" 
            placeholder="Set Monthly Budget" 
            onChange={handleChange} 
          />

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account? 
          <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </div>
  );
}