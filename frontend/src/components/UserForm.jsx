import { useState } from "react";

const INITIAL = { name: "", email: "", role: "user" };

const field = {
  padding: "9px 12px",
  border: "1px solid #cbd5e0",
  borderRadius: "6px",
  fontSize: "0.95rem",
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
};

function UserForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Les champs nom et email sont requis.");
      return;
    }
    setError("");
    await onSubmit(form);
    setForm(INITIAL);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      maxWidth: "380px",
      background: "#fff",
      padding: "24px",
      borderRadius: "10px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}>
      <h2 style={{ fontSize: "1rem", fontWeight: "600", color: "#2d3748", margin: 0 }}>
        Nouvel utilisateur
      </h2>
      {error && <p style={{ color: "#e53e3e", fontSize: "0.85rem", margin: 0 }}>{error}</p>}
      <input style={field} type="text"   name="name"  placeholder="Nom"   value={form.name}  onChange={handleChange} />
      <input style={field} type="email"  name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <select style={field} name="role" value={form.role} onChange={handleChange}>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      <button type="submit" style={{
        padding: "9px",
        backgroundColor: "#2c3e50",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "0.95rem",
        fontWeight: "500",
        cursor: "pointer",
      }}>
        Créer
      </button>
    </form>
  );
}

export default UserForm;
