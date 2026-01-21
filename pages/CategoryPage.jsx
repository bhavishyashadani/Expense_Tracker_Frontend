// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/api";
// import AddExpense from "../components/AddExpense";
// import ExpenseItem from "../components/ExpenseItem";
// import Navbar from "../components/Navbar";

// export default function CategoryPage() {
//   const { id } = useParams(); // categoryId
//   const [expenses, setExpenses] = useState([]);

//   const [editingExpense, setEditingExpense] = useState(null);
//   const [editAmount, setEditAmount] = useState("");

//   /* ================= FETCH ================= */

//   useEffect(() => {
//     fetchExpenses();
//   }, [id]);

//   async function fetchExpenses() {
//     try {
//       const res = await api.get(`/expense/list/${id}`);
//       setExpenses(Array.isArray(res.data) ? res.data : []);
//     } catch {
//       setExpenses([]);
//     }
//   }

//   /* ================= SAFE SETTER ================= */

//   function safeSetExpenses(data) {
//     if (Array.isArray(data)) {
//       setExpenses(data);
//     } else {
//       fetchExpenses(); // fallback
//     }
//   }

//   /* ================= DELETE ================= */

//   async function deleteExpense(expenseId) {
//     try {
//       const res = await api.delete(`/expense/delete/${expenseId}`);
//       safeSetExpenses(res.data);
//     } catch {
//       alert("Failed to delete expense");
//     }
//   }

//   /* ================= EDIT ================= */

//   function startEdit(expense) {
//     setEditingExpense(expense);
//     setEditAmount(expense.amount?.toString() || "");
//   }

//   async function saveEdit() {
//     try {
//       const res = await api.put(`/expense/edit/${editingExpense._id}`, {
//         amount: Number(editAmount)
//       });
//       safeSetExpenses(res.data);
//       cancelEdit();
//     } catch {
//       alert("Failed to edit expense");
//     }
//   }

//   function cancelEdit() {
//     setEditingExpense(null);
//     setEditAmount("");
//   }

//   /* ================= UI ================= */

//   return (
//     <div>
//       <Navbar />

//       <div className="container">
//         <h2>Category Expenses</h2>

//         <AddExpense categoryId={id} setExpenses={safeSetExpenses} />

//         {/* EDIT BOX */}
//         {editingExpense !== null && (
//           <div className="card">
//             <h3>Edit Expense</h3>

//             <input
//               type="number"
//               value={editAmount}
//               onChange={(e) => setEditAmount(e.target.value)}
//             />

//             <button
//               className="primary"
//               disabled={!editAmount || Number(editAmount) <= 0}
//               onClick={saveEdit}
//             >
//               Save
//             </button>

//             <button
//               className="secondary"
//               style={{ marginLeft: "10px" }}
//               onClick={cancelEdit}
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* LIST */}
//         <div className="card">
//           <h3>Expenses</h3>

//           {Array.isArray(expenses) && expenses.length === 0 && (
//             <p>No expenses yet</p>
//           )}

//           {Array.isArray(expenses) &&
//             expenses.map((exp) => (
//               <ExpenseItem
//                 key={exp._id}
//                 expense={exp}
//                 onDelete={deleteExpense}
//                 onEdit={startEdit}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import AddExpense from "../components/AddExpense";
import ExpenseItem from "../components/ExpenseItem";
import Navbar from "../components/Navbar";
import "../Style/category.css"; // <--- INTEGRATED CSS HERE

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  const [editingExpense, setEditingExpense] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchExpenses();
  }, [id]);

  async function fetchExpenses() {
    try {
      const res = await api.get(`/expense/list/${id}`);
      setExpenses(Array.isArray(res.data) ? res.data : []);
    } catch {
      setExpenses([]);
    }
  }

  function safeSetExpenses(data) {
    if (Array.isArray(data)) {
      setExpenses(data);
    } else {
      fetchExpenses();
    }
  }

  /* ================= DELETE ================= */
  async function deleteExpense(expenseId) {
    if (!window.confirm("Delete this expense?")) return;
    try {
      const res = await api.delete(`/expense/delete/${expenseId}`);
      safeSetExpenses(res.data);
    } catch {
      alert("Failed to delete expense");
    }
  }

  /* ================= EDIT ================= */
  function startEdit(expense) {
    setEditingExpense(expense);
    setEditAmount(expense.amount?.toString() || "");
  }

  async function saveEdit() {
    try {
      const res = await api.put(`/expense/edit/${editingExpense._id}`, {
        amount: Number(editAmount)
      });
      safeSetExpenses(res.data);
      cancelEdit();
    } catch {
      alert("Failed to edit expense");
    }
  }

  function cancelEdit() {
    setEditingExpense(null);
    setEditAmount("");
  }

  /* ================= UI ================= */
  return (
    <div>
      <Navbar />

      <div className="container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>

        <h2>Category Expenses</h2>

        <AddExpense categoryId={id} setExpenses={safeSetExpenses} />

        {/* EDIT MODAL */}
        {editingExpense && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Expense</h3>
              <div style={{ marginTop: "1rem" }}>
                <input
                  className="auth-input"
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="Amount"
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button className="primary" style={{ flex: 1 }} onClick={saveEdit}>
                    Save
                  </button>
                  <button
                    className="primary"
                    style={{ flex: 1, background: "#e5e7eb", color: "#374151" }}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LIST */}
        <div className="card">
          <h3>History</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "1rem" }}>
            {Array.isArray(expenses) && expenses.length === 0 && (
              <p style={{ color: "#9ca3af" }}>No expenses yet</p>
            )}

            {Array.isArray(expenses) &&
              expenses.map((exp) => (
                <ExpenseItem
                  key={exp._id}
                  expense={exp}
                  onDelete={deleteExpense}
                  onEdit={startEdit}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}