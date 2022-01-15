import UserData from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { email, name, password, role } = req.body;
  bcrypt.hash(password, 10).then((hashedpassword) => {
    const user = new UserData({
      name,
      email,
      password: hashedpassword,
      role,
    });
    try {
      user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  await UserData.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const { _id, name, email, role } = savedUser;
            const token = generateToken(_id);
            res
              .status(200)
              .send({ accessToken: token, id: _id, email, name, role });
          } else {
            return res
              .status(404)
              .send({ message: "Invalid Password", accessToken: null });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = async (req, res) => {
  const user = await UserData.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
