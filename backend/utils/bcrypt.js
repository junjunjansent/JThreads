// not sure why but had to use bcryptjs instead of bcrypt
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const bcryptPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const isPasswordBCryptValidated = (passwordToCheck, aHashedPassword) => {
  return bcrypt.compareSync(passwordToCheck, aHashedPassword);
};

module.exports = { bcryptPassword, isPasswordBCryptValidated };
