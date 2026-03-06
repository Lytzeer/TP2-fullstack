const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;

    const users = await UserModel.User.find(filter);
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const user = await UserModel.User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Les champs name et email sont requis",
      });
    }
    const user = await UserModel.User.create({ name, email, role });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Cet email est déjà utilisé" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const { _id, createdAt, ...updateData } = req.body;
    const user = await UserModel.User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const deleted = await UserModel.User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
