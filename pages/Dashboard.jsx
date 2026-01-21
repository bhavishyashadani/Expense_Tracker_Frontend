// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import AddCategory from "../components/AddCategory";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const [categories, setCategories] = useState([]);
//   const [balances, setBalances] = useState({
//     cashBalance: 0,
//     onlineBalance: 0,
//     monthlyBudget: 0
//   });
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   /* ================= FETCH DATA ================= */

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   async function fetchAll() {
//     try {
//       await Promise.all([fetchCategories(), fetchBalances()]);
//       setLoading(false);
//     } catch (err) {
//       console.error("Dashboard fetch failed");
//       setLoading(false);
//     }
//   }

//   async function fetchCategories() {
//     const res = await api.get("/category/list");
//     setCategories(res.data);
//   }

//   async function fetchBalances() {
//     const res = await api.get("/user/profile");
//     setBalances(res.data);
//   }
//   async function deleteCategory(categoryId) {
//   try {
//     const res = await api.delete(`/category/delete/${categoryId}`);
//     setCategories(res.data);
//   } catch (err) {
//     alert("Failed to delete category");
//   }
// }


//   /* ================= UI ================= */

//   if (loading) {
//     return <div className="container">Loading dashboard...</div>;
//   }

//   return (
//     <div>
//       <Navbar></Navbar>
//     <div className="container">
//       <h2>Dashboard</h2>

//       {/* ===== BALANCES ===== */}
//       <div className="balance-grid">
//         <div className="card balance-card">
//           <h4>Cash Balance</h4>
//           <p>₹{balances.cashBalance}</p>
//         </div>

//         <div className="card balance-card">
//           <h4>Online Balance</h4>
//           <p>₹{balances.onlineBalance}</p>
//         </div>

//         <div className="card balance-card">
//           <h4>Monthly Budget</h4>
//           <p>₹{balances.monthlyBudget}</p>
//         </div>
//       </div>

//       {/* ===== ADD CATEGORY ===== */}
//       <AddCategory setCategories={setCategories} />

//       {/* ===== CATEGORY LIST ===== */}
//       <div className="card">
//         <h3>Category-wise Spending</h3>

//         {categories.length === 0 && (
//           <p>No categories created yet</p>
//         )}

//         {categories.map((cat) => (
//   <div key={cat._id} className="list-item">
//     <span
//       onClick={() => navigate(`/category/${cat._id}`)}
//       style={{ cursor: "pointer" }}
//     >
//       {cat.cat_name}
//     </span>

//     <div>
//       <strong>₹{cat.cat_total}</strong>

//       <button
//         style={{ marginLeft: "10px" }}
//         onClick={() => deleteCategory(cat._id)}
//       >
//         ❌
//       </button>
//     </div>
//   </div>
// ))}

//       </div>
//     </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AddCategory from "../components/AddCategory";
import Navbar from "../components/Navbar";
import "../Style/Dashboard.css"; // Import the styles

// Simple SVG Icons
const IconWallet = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
);
const IconBank = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
);
const IconChart = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
);
const IconTrash = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [balances, setBalances] = useState({
    cashBalance: 0,
    onlineBalance: 0,
    monthlyBudget: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      await Promise.all([fetchCategories(), fetchBalances()]);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch failed");
      setLoading(false);
    }
  }

  async function fetchCategories() {
    const res = await api.get("/category/list");
    setCategories(res.data);
  }

  async function fetchBalances() {
    const res = await api.get("/user/profile");
    setBalances(res.data);
  }

  async function deleteCategory(categoryId) {
    if(!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await api.delete(`/category/delete/${categoryId}`);
      setCategories(res.data);
    } catch (err) {
      alert("Failed to delete category");
    }
  }

  /* ================= UI ================= */

  if (loading) {
    return <div className="container" style={{textAlign:'center', marginTop: '50px'}}>Loading dashboard...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        
        <div className="dashboard-header">
          <h2>Dashboard</h2>
        </div>

        {/* ===== BALANCES ===== */}
        <div className="balance-grid">
          <div className="card balance-card">
            <div className="balance-header">
              <IconWallet /> <span>Cash Balance</span>
            </div>
            <div className="balance-amount">₹{balances.cashBalance}</div>
          </div>

          <div className="card balance-card">
            <div className="balance-header">
              <IconBank /> <span>Online Balance</span>
            </div>
            <div className="balance-amount">₹{balances.onlineBalance}</div>
          </div>

          <div className="card balance-card">
            <div className="balance-header">
              <IconChart /> <span>Monthly Budget</span>
            </div>
            <div className="balance-amount">₹{balances.monthlyBudget}</div>
          </div>
        </div>

        {/* ===== ADD CATEGORY ===== */}
        <div style={{ marginBottom: '2rem' }}>
            <AddCategory setCategories={setCategories} />
        </div>

        {/* ===== CATEGORY LIST ===== */}
        <div className="card list-container">
          <h3>Category Spending</h3>

          {categories.length === 0 ? (
            <p style={{ color: '#9ca3af', marginTop: '1rem' }}>No categories created yet.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {categories.map((cat) => (
                <div key={cat._id} className="list-item">
                  <span
                    className="category-name"
                    onClick={() => navigate(`/category/${cat._id}`)}
                    style={{ cursor: "pointer", flex: 1 }}
                  >
                    {cat.cat_name}
                  </span>

                  <div className="list-actions">
                    <span className="amount-tag">₹{cat.cat_total}</span>
                    <button
                      className="delete-btn"
                      title="Delete Category"
                      onClick={() => deleteCategory(cat._id)}
                    >
                      <IconTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}