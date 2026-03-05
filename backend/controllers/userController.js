const UserModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  const users = UserModel.getAll();
  res.status(200).json({ success: true, count: users.length, data: users });
};

const getUserById = (req, res) => {
  const user = UserModel.getById(parseInt(req.params.id));
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Utilisateur non trouvé" });
  }
  res.status(200).json({ success: true, data: user });
};

const createUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Les champs name et email sont requis" });
  }
  const user = UserModel.create({ name, email, role });
  res.status(201).json({ success: true, data: user });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (!UserModel.getById(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Utilisateur non trouvé" });
  }
  const user = UserModel.update(id, req.body);
  res.status(200).json({ success: true, data: user });
};

const deleteUser = (req, res) => {
  const deleted = UserModel.remove(parseInt(req.params.id));
  if (!deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Utilisateur non trouvé" });
  }
  res.status(204).send();
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
