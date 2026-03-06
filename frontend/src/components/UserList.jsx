import UserCard from "./UserCard";

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  padding: "16px 0",
};

function UserList({ users, loading, error, onDelete }) {
  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "#e74c3c" }}>{error}</p>;
  if (users.length === 0) return <p>Aucun utilisateur.</p>;

  return (
    <div style={gridStyle}>
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default UserList;
