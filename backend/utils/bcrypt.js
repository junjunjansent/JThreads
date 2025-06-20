import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const bcryptPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const isPasswordBCryptValidated = (passwordToCheck, aHashedPassword) => {
  return bcrypt.compareSync(passwordToCheck, aHashedPassword);
};

export { bcryptPassword, isPasswordBCryptValidated };
