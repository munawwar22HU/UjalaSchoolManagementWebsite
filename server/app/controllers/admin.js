import UserData from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const createUser = (req, res) => {
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

  const { email, name, role, image } = req.body;
  const password = generatePassword();
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
          res.status(409).json({ message: error.message });
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

export const getUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const allUsers = await UserData.find(
      { _id: { $ne: id } },
      {
        name: 1,
        email: 1,
        role: 1,
        image: 1,
      }
    );

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await UserData.findByIdAndRemove(id).exec();
    res.status(200).json("Successfull Deleted!");
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: -1 });
    return;
  }
};

export const getUser = async (req, res) => {
  console.log(req.params);
  try {
    const id = req.params.id;
    const singleUser = await UserData.findById(id, { password: 0 });

    res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    await UserData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const user = await UserData.findById(id, { _id: 0, password: 0 });
    res.status(200).json(user);
    return;
  } catch (error) {
    console.log(error);
  }
};
