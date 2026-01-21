// export default function ExpenseItem({ expense, onDelete, onEdit }) {
//   return (
//     <div className="list-item">
//       <span>
//         ₹{expense.amount} ({expense.paymentType})
//       </span>

//       <span>
//         <button onClick={() => onEdit(expense)}>Edit</button>
//         <button onClick={() => onDelete(expense._id)}>Delete</button>
//       </span>

//       <span>
//         {new Date(expense.createdAt).toLocaleDateString()}
//       </span>
//     </div>
//   );
// }
import "../Style/category.css"; // <--- INTEGRATED CSS HERE

export default function ExpenseItem({ expense, onDelete, onEdit }) {
  const dateStr = new Date(expense.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });

  const type = expense.paymentType || "cash";
  const isOnline = type.toLowerCase() === "online";

  return (
    <div className="income-item"> {/* Reusing the shared item class */}
      
      <div className="income-info">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className={`badge ${isOnline ? "badge-online" : "badge-cash"}`}>
            {type}
          </span>
          <span className="income-date">{dateStr}</span>
        </div>
      </div>

      <div className="income-right">
        {/* Red color for expenses */}
        <span className="expense-amount">-₹{expense.amount}</span>

        <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
          <button className="delete-btn" style={{ color: "#6b7280" }} onClick={() => onEdit(expense)}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          
          <button className="delete-btn" style={{ color: "#ef4444" }} onClick={() => onDelete(expense._id)}>
             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}