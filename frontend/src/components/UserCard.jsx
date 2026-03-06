const badge = {
  admin: { backgroundColor: "#e74c3c", color: "#fff" },
  user:  { backgroundColor: "#ecf0f1", color: "#555" },
};

function UserCard({ user, onDelete }) {
  const date = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      width: "260px",
    }}>
      <strong style={{ fontSize: "1rem", color: "#1a202c" }}>{user.name}</strong>
      <span style={{ fontSize: "0.875rem", color: "#718096" }}>{user.email}</span>
      <span style={{
        alignSelf: "flex-start",
        padding: "2px 10px",
        borderRadius: "99px",
        fontSize: "0.75rem",
        fontWeight: "600",
        ...(badge[user.role] ?? badge.user),
      }}>
        {user.role}
      </span>
      <span style={{ fontSize: "0.75rem", color: "#a0aec0", marginTop: "2px" }}>
        {date}
      </span>
      <button
        onClick={() => onDelete(user._id)}
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          backgroundColor: "#fff",
          color: "#e53e3e",
          border: "1px solid #e53e3e",
          borderRadius: "6px",
          fontSize: "0.85rem",
          alignSelf: "flex-start",
          transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.target.style.backgroundColor = "#e53e3e"; e.target.style.color = "#fff"; }}
        onMouseLeave={e => { e.target.style.backgroundColor = "#fff"; e.target.style.color = "#e53e3e"; }}
      >
        Supprimer
      </button>
    </div>
  );
}

export default UserCard;
