export const usernameValidator = (username) => {
  if (username.length < 3) return "Name must be at least 3 characters long";
  if (username.length > 20) return "Name must be less than 20 characters long";
  if (!/^[a-z0-9_-]+$/.test(username))
    return "Username can only contain lowercase letters, numbers, hyphens, and underscores";
  return false;
};

export const emailValidator = (email) => {
  if (!/^[-.\w]+@[-.\w]+\.[-.\w]{2,}$/.test(email))
    return "Email needs to be in correct format";
  return false;
};

export const nameValidator = (name) => {
  if (!/^[a-zA-Z\s]{2,}$/.test(name))
    return "Name is expected to be longer than 2 characters";
  return false;
};

export const phoneNumberValidator = (phoneNumber) => {
  if (!/^\+?[1-9](?:\s?\d){6,14}$/.test(phoneNumber))
    return "Expected valid international phone number";
  return false;
};
