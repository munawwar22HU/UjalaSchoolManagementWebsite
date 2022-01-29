import UserData from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { email, name, password, role, image } = req.body;
  bcrypt.hash(password, 10).then((hashedpassword) => {
    const user = new UserData({
      name,
      email,
      password: hashedpassword,
      role,
      image,
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
            const { _id, name, email, role, image } = savedUser;
            const token = generateToken(_id);
            res
              .status(200)
              .send({ accessToken: token, id: _id, email, name, role, image });
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

export const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const id = req.params.id;
    await UserData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const user = await UserData.findById(id, { password: 0 });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (req, res) => {
  const user = await UserData.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
