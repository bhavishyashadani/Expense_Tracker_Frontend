// import { useState } from "react";
// import api from "../services/api";

// export default function AddCategory({ setCategories }) {
//   const [name, setName] = useState("");

//   async function addCategory() {
//     if (!name) return;

//     const res = await api.post("/category/create", {
//       cat_name: name
//     });

//     setCategories((prev) => [...prev, res.data]);
//     setName("");
//   }

//   return (
//     <div className="card">
//       <h3>Add Category</h3>
//       <input
//         placeholder="Category name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button className="primary" onClick={addCategory}>
//         Add
//       </button>
//     </div>
//   );
// }
import { useState } from "react";
import api from "../services/api";
import "../Style/Dashboard.css"; // Ensure CSS is imported

export default function AddCategory({ setCategories }) {
  const [name, setName] = useState("");

  async function addCategory() {
    if (!name) return;

    try {
      const res = await api.post("/category/create", {
        cat_name: name
      });
      setCategories((prev) => [...prev, res.data]);
      setName("");
    } catch (err) {
      console.error("Failed to add category");
    }
  }

  return (
    <div className="card">
      <h3>Add New Category</h3>
      <div className="input-group">
        <input
          placeholder="e.g. Groceries, Rent, Fuel..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCategory()}
        />
        <button className="primary" onClick={addCategory}>
          + Add
        </button>
      </div>
    </div>
  );
}