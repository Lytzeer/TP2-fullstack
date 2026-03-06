import { useState, useEffect } from "react";
import "./App.css";
import userService from "./services/userService";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userService.getAll();
      setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors du chargement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await userService.create(formData);
      setUsers((prev) => [...prev, res.data.data]);
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors de la création.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.remove(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.message ?? "Erreur lors de la suppression.");
    }
  };

  return (
    <>
      <Navbar count={users.length} />
      <main style={{ padding: "24px" }}>
        <UserForm onSubmit={handleCreate} />
        <UserList
          users={users}
          loading={loading}
          error={error}
          onDelete={handleDelete}
        />
      </main>
    </>
  );
}

export default App;
