import "../Style/income.css"; // Ensure styles are imported

export default function IncomeItem({ income, onEdit, onDelete }) {
  // Format Date (e.g., "Jan 19, 2026")
  const dateStr = new Date(income.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // === FIX IS HERE ===
  // Map backend fields correctly: 'paymentType' instead of 'method'
  const type = income.paymentType || "Cash"; 
  const isOnline = type.toLowerCase() === "online";

  return (
    <div className="income-item">
      {/* Left Side: Source, Badge, Date */}
      <div className="income-info">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
          {/* === FIX IS HERE === */}
          {/* Use 'receivedFrom' instead of 'source' */}
          <span className="income-source">{income.receivedFrom || "Unknown Source"}</span>
          
          {/* The pill-shaped badge */}
          <span className={`badge ${isOnline ? "badge-online" : "badge-cash"}`}>
            {type}
          </span>
        </div>
        <span className="income-date">{dateStr}</span>
      </div>

      {/* Right Side: Amount & Actions */}
      <div className="income-right">
        <span className="income-amount">+₹{income.amount}</span>

        <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
          {/* Edit Icon */}
          <button
            onClick={() => onEdit(income)}
            className="delete-btn" // Reusing the clean button style
            style={{ color: "#6b7280" }} // Gray for edit
            title="Edit"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>

          {/* Delete Icon */}
          <button
            onClick={() => onDelete(income._id)}
            className="delete-btn"
            style={{ color: "#ef4444" }} // Red for delete
            title="Delete"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
} 