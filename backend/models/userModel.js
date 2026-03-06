const mangoose = require("mongoose");
const { Schema } = mangoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const User = mangoose.model("User", userSchema);

const getAll = () => User.find();

const getById = (id) => User.findById(id);

const create = (data) => {
  const newUser = new User(data);
  return newUser;
};

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, remove, User };
