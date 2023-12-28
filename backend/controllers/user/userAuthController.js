import User from "../../models/user/userModel.js";

const registerUser = async (req, res) => {
  res.send("Register route");
};

const loginUser = async (req, res) => {
  res.send("Login route");
};

const logoutUser = async (req, res) => {
  res.send("Logout route");
};

export { registerUser, loginUser, logoutUser };
