const users = require("../data/users");

const getAll = () => users;

const getById = (id) => users.find((u) => u.id === id);

const create = (data) => {
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name: data.name,
    email: data.email,
    role: data.role || "user",
    createdAt: new Date().toISOString().split("T")[0],
  };
  users.push(newUser);
  return newUser;
};

const update = (id, data) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const { id: _id, createdAt: _createdAt, ...allowed } = data;
  users[index] = { ...users[index], ...allowed };
  return users[index];
};

const remove = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
