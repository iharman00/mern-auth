import User from "../../models/user/userModel.js";
import generateToken from "../../utils/generateToken.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //   Checks for invalid data
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please send all fields");
      return;
    }

    //   Checks if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409);
      throw new Error("User already exists");
      return;
    }

    //   Creates the user, generates a token including the userID and sends a cookie and response
    const newUser = await User.create({ name, email, password });
    generateToken(res, newUser._id);

    res.status(200).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //   Checks for invalid data
    if (!email || !password) {
      res.status(400);
      throw new Error("Please send all fields");
      return;
    }

    const user = await User.findOne({ email });

    //   Generates a token including the userID and sends a cookie and response
    if (user && user.matchPassword(password)) {
      generateToken(res, user._id);
      return res.status(200).json({
        message: "Logged In successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }

    res.status(401);
    throw new Error("Invalid email or password");
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({
      message: "Logged out successfully",
    });
};

export { registerUser, loginUser, logoutUser };
