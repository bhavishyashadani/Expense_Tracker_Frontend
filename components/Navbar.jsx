import { NavLink, useNavigate } from "react-router-dom";
import "../Style/nav.css"; // <--- Import the styles

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    // Optional: Add a confirmation
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        {/* Brand / Logo */}
        <span className="nav-brand">SmartSpend AI</span>

        {/* Navigation Links */}
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/income" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Income
        </NavLink>

        <NavLink 
          to="/scan" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          Scan & Add Expense
        </NavLink>
      </div>

      {/* Logout Button */}
      <button className="nav-logout" onClick={logout}>
        {/* Logout Icon */}
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path></svg>
        Logout
      </button>
    </nav>
  );
}