// const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const saltRounds = 12;

const signUp = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(409).json({ err: "Username already taken." });
    }

    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
    });

    const payload = { username: user.username, _id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { signUp };
