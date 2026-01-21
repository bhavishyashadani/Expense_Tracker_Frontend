import { useState } from "react";
import api from "../services/api";
import "../Style/income.css"; // Ensure this path is correct

export default function AddIncome({ setIncomes }) {
  const [data, setData] = useState({
    amount: "",
    receivedFrom: "",
    paymentType: "cash"
  });

  async function addIncome() {
    if (!data.amount || !data.receivedFrom) return;

    try {
      const res = await api.post("/income/add", {
        amount: Number(data.amount),
        paymentType: data.paymentType,
        receivedFrom: data.receivedFrom
      });

      // === FIX IS HERE ===
      // The backend returns the full sorted list, so we just set it directly.
      if (Array.isArray(res.data)) {
        setIncomes(res.data); 
      }
      
      // Clear form
      setData({ amount: "", receivedFrom: "", paymentType: "cash" });
    } catch (err) {
      console.error("Failed to add income");
      alert("Error adding income");
    }
  }

  return (
    <div className="card" style={{ marginBottom: "2rem" }}>
      <h3>Add Income</h3>

      {/* Grid for Amount & Source */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "15px", marginTop: "1rem" }}>
        <div>
          <label style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "5px", display: "block" }}>
            Amount
          </label>
          <input
            className="auth-input"
            type="number"
            placeholder="₹ 0"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "5px", display: "block" }}>
            Received From
          </label>
          <input
            className="auth-input"
            placeholder="e.g. Salary, Freelance..."
            value={data.receivedFrom}
            onChange={(e) => setData({ ...data, receivedFrom: e.target.value })}
          />
        </div>
      </div>

      {/* Grid for Type & Button */}
      <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
        <div style={{ flex: 1 }}>
            <select
              className="auth-input"
              value={data.paymentType}
              onChange={(e) => setData({ ...data, paymentType: e.target.value })}
              style={{ cursor: "pointer", height: "100%" }}
            >
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
        </div>

        <button 
          className="primary" 
          onClick={addIncome}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
          Add Record
        </button>
      </div>
    </div>
  );
}