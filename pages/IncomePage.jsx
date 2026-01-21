// import { useEffect, useState } from "react";
// import api from "../services/api";
// import AddIncome from "../components/AddIncome";
// import IncomeItem from "../components/IncomeItem";
// import Navbar from "../components/Navbar";

// export default function IncomePage() {
//   const [incomes, setIncomes] = useState([]);

//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editAmount, setEditAmount] = useState("");
//   const [editSource, setEditSource] = useState("");

//   /* ================= FETCH ================= */

//   useEffect(() => {
//     fetchIncomes();
//   }, []);

//   async function fetchIncomes() {
//     try {
//       const res = await api.get("/income/list");
//       setIncomes(Array.isArray(res.data) ? res.data : []);
//     } catch {
//       alert("Failed to fetch incomes");
//     }
//   }

//   /* ================= DELETE ================= */

//   async function deleteIncome(incomeId) {
//     try {
//       const res = await api.delete(`/income/delete/${incomeId}`);
//       setIncomes(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       alert(err.response?.data || "Delete failed");
//     }
//   }

//   /* ================= EDIT ================= */

//   function startEdit(income) {
//     setEditingIncome(income);
//     setEditAmount(income.amount?.toString() || "");
//     setEditSource(income.source || "");
//   }

//   async function saveEdit() {
//     try {
//       const res = await api.put(`/income/edit/${editingIncome._id}`, {
//         amount: Number(editAmount),
//         source: editSource
//       });

//       setIncomes(Array.isArray(res.data) ? res.data : []);
//       cancelEdit();
//     } catch (err) {
//       alert(err.response?.data || "Edit failed");
//     }
//   }

//   function cancelEdit() {
//     setEditingIncome(null);
//     setEditAmount("");
//     setEditSource("");
//   }

//   /* ================= UI ================= */

//   return (
//     <div>
//       <Navbar />

//       <div className="container">
//         <h2>Income</h2>

//         <AddIncome setIncomes={setIncomes} />

//         {/* EDIT BOX */}
//         {editingIncome !== null && (
//           <div className="card">
//             <h3>Edit Income</h3>

//             <input
//               type="number"
//               value={editAmount}
//               onChange={(e) => setEditAmount(e.target.value)}
//             />

//             <input
//               type="text"
//               value={editSource}
//               onChange={(e) => setEditSource(e.target.value)}
//               placeholder="Source"
//             />

//             <button className="primary" onClick={saveEdit}>
//               Save
//             </button>

//             <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* LIST */}
//         <div className="card">
//           <h3>Last 15 Days</h3>

//           {Array.isArray(incomes) && incomes.length === 0 && (
//             <p>No income records</p>
//           )}

//           {Array.isArray(incomes) &&
//             incomes.map((inc) => (
//               <IncomeItem
//                 key={inc._id}
//                 income={inc}
//                 onEdit={startEdit}
//                 onDelete={deleteIncome}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../services/api";
import AddIncome from "../components/AddIncome";
import IncomeItem from "../components/IncomeItem";
import Navbar from "../components/Navbar";
import "../Style/income.css"; // Import the CSS

export default function IncomePage() {
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editSource, setEditSource] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchIncomes();
  }, []);

  async function fetchIncomes() {
    try {
      const res = await api.get("/income/list");
      setIncomes(Array.isArray(res.data) ? res.data : []);
    } catch {
      console.error("Failed to fetch incomes");
    }
  }

  /* ================= DELETE ================= */
  async function deleteIncome(incomeId) {
    if (!window.confirm("Delete this income record?")) return;
    try {
      const res = await api.delete(`/income/delete/${incomeId}`);
      setIncomes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Delete failed");
    }
  }

  /* ================= EDIT ================= */
  function startEdit(income) {
    setEditingIncome(income);
    setEditAmount(income.amount?.toString() || "");
    setEditSource(income.source || "");
  }

  async function saveEdit() {
    try {
      const res = await api.put(`/income/edit/${editingIncome._id}`, {
        amount: Number(editAmount),
        source: editSource
      });
      setIncomes(Array.isArray(res.data) ? res.data : []);
      cancelEdit();
    } catch (err) {
      alert("Edit failed");
    }
  }

  function cancelEdit() {
    setEditingIncome(null);
    setEditAmount("");
    setEditSource("");
  }

  /* ================= UI ================= */
  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Income Management</h2>
        
        {/* ADD INCOME FORM */}
        <AddIncome setIncomes={setIncomes} />

        {/* INCOME LIST */}
        <div className="card">
          <h3>Transaction History</h3>
          
          <div className="income-list">
            {Array.isArray(incomes) && incomes.length === 0 && (
                <p style={{color: '#9ca3af', textAlign:'center', padding: '1rem'}}>No income records found.</p>
            )}

            {Array.isArray(incomes) && incomes.map((inc) => (
                <IncomeItem
                    key={inc._id}
                    income={inc}
                    onEdit={startEdit}
                    onDelete={deleteIncome}
                />
            ))}
          </div>
        </div>

        {/* EDIT MODAL (POPUP) */}
        {editingIncome && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Income</h3>
              
              <div style={{display:'flex', flexDirection:'column', gap:'1rem', marginTop:'1rem'}}>
                  <div>
                    <label style={{fontSize:'0.85rem', color:'#6b7280'}}>Amount</label>
                    <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="auth-input" // Reusing input style
                    />
                  </div>
                  
                  <div>
                    <label style={{fontSize:'0.85rem', color:'#6b7280'}}>Source</label>
                    <input
                        type="text"
                        value={editSource}
                        onChange={(e) => setEditSource(e.target.value)}
                        className="auth-input"
                    />
                  </div>

                  <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                      <button className="primary" style={{flex:1}} onClick={saveEdit}>Save Changes</button>
                      <button className="primary" style={{flex:1, background:'#e5e7eb', color:'#374151'}} onClick={cancelEdit}>Cancel</button>
                  </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}