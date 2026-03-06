function Navbar({ count }) {
  return (
    <nav style={{
      backgroundColor: "#2c3e50",
      color: "#fff",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <span style={{ fontWeight: "600", fontSize: "1.1rem", letterSpacing: "0.02em" }}>
        Gestion des utilisateurs
      </span>
      <span style={{ fontSize: "0.9rem", opacity: 0.75 }}>
        {count} utilisateur{count !== 1 ? "s" : ""}
      </span>
    </nav>
  );
}

export default Navbar;
