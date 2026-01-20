import UserData from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
  const { email, name, password, role, image } = req.body;
  console.log(email, name, password, role, image);
  const user = await UserData.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  } else {
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
  }
};

export const createUser = async (req, res) => {
  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const { email, name, role } = req.body;
  const password = generatePassword();
  const image =
    "https://res.cloudinary.com/doow2fp6w/image/upload/v1642275314/download_njeoqw.png";
  console.log(password);
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
      //res.status(201).json(user);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`,
        },
      });
      const mailOptions = {
        from: "khidmat.ujala@gmail.com",
        to: `${email}`,
        subject: "Welcome to Khidmat-Ujala",
        text: `Dear, ${name}\n\nThank you for registering with us.\n\nWe are happy to have you as a member of our community.Please following these instructions for loggoing to the system.\n\n1)Browse to https://ujala-parents-voice.herokuapp.com/login\n\n2)Enter your credentials\n\nEmail Address: ${email} \n\nPassword:${password}\n\nThank you,\n\nKhidmat-Ujala Team`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(201).json(user);
        }
      });
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
    return;
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

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, id } = req.body;

  const user = await UserData.findById(id);
  if (user) {
    bcrypt
      .compare(oldPassword, user.password)
      .then((doMatch) => {
        if (doMatch) {
          bcrypt.hash(newPassword, 10).then((hashedpassword) => {
            UserData.findByIdAndUpdate(id, {
              $set: { password: hashedpassword },
            }).exec();
            res.status(200).send({ message: "Password updated successfully" });
          });
        } else {
          res.status(401).send({ message: "Invalid Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
