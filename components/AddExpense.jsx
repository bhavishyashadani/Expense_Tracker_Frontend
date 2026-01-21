// import { useState } from "react";
// import api from "../services/api";

// export default function AddExpense({ categoryId, setExpenses }) {
//   const [amount, setAmount] = useState("");
//   const [paymentType, setPaymentType] = useState("cash");

//   async function addExpense() {
//     if (!amount) return;

//     const res = await api.post(`/expense/add/${categoryId}`, {
//       amount: Number(amount),
//       paymentType
//     });

//     setExpenses((prev) => [res.data, ...prev]);
//     setAmount("");
//   }

//   return (
//     <div className="card">
//       <h3>Add Expense</h3>
    
//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <select
//         value={paymentType}
//         onChange={(e) => setPaymentType(e.target.value)}
//       >
//         <option value="cash">Cash</option>
//         <option value="online">Online</option>
//       </select>

//       <button className="primary" onClick={addExpense}>
//         Add Expense
//       </button>
//     </div>
//   );
// }
import { useState } from "react";
import api from "../services/api";
import "../Style/category.css"; // <--- INTEGRATED CSS HERE

export default function AddExpense({ categoryId, setExpenses }) {
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("cash");

  async function addExpense() {
    if (!amount) return;

    try {
      const res = await api.post(`/expense/add/${categoryId}`, {
        amount: Number(amount),
        paymentType
      });

      setExpenses((prev) => [res.data, ...prev]);
      setAmount("");
    } catch (err) {
      console.error("Failed to add expense");
    }
  }

  return (
    <div className="card" style={{ marginBottom: "2rem" }}>
      <h3>Record Expense</h3>

      <div className="input-group" style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: "10px", marginTop: "1rem" }}>
        {/* Amount */}
        <input
          className="auth-input"
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Type */}
        <select
          className="auth-input"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          style={{ cursor: "pointer" }}
        >
          <option value="cash">Cash</option>
          <option value="online">Online</option>
        </select>

        {/* Button */}
        <button className="primary" onClick={addExpense} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
          Add
        </button>
      </div>
    </div>
  );
}