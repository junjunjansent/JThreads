// Sync in with Database & Frontend thanks

const { ApiError } = require("./errorHandler");

const usernameValidator = (username) => {
  if (username.length < 3 || username.length > 20) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Username Format",
      detail: "Username must be 3-20 characters long.",
    });
  } else if (!/^[a-z0-9_-]+$/.test(username)) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Username Format",
      detail:
        "Username must only contain lowercase letters, numbers, hyphens, and underscores.",
    });
  }
};

const emailValidator = (email) => {
  if (!/^[-.\w]+@[-.\w]+\.[-.\w]{2,}$/.test(email)) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Email Format",
      detail: "Email needs to be in correct format",
    });
  }
};

const passwordValidator = (password) => {
  if (
    password.length < 8 ||
    /\s/.test(password) ||
    !/[a-zA-Z0-9]/.test(password)
  ) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Password Format",
      detail:
        "Password must be at least characters long, not contain spaces, and have at least one letter or number.",
    });
  }
};

const nameValidator = (name) => {
  if (!/^[a-zA-Z\s]{2,}$/.test(name.trim())) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Name Format",
      detail: "Name must be at least 2 characters long.",
    });
  }
};

const phoneNumberValidator = (phoneNumber) => {
  if (!/^\+?[1-9](?:\s?\d){6,14}$/.test(phoneNumber)) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Phone Number Format",
      detail: "Phone number must be in international number format.",
    });
  }
};

/**
 * Checks if number is in range and type given
 *
 * @param {number|string} number - Value to check
 * @param {Object} [options={}] - option (See below)
 * @param {number} [options.min=0]
 * @param {number} [options.max=Infinity]
 * @param {"integer"|"price"} [options.type="integer"] - Type of number to validate.
 */
const numberRangeValidator = (
  number,
  { min = 0, max = Infinity, type = "integer" } = {}
) => {
  const convertedNum = Number(number);
  if (isNaN(convertedNum) || convertedNum < min || convertedNum > max) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Number Range Format",
      detail: `Number must be a valid number within ${min} and ${max}.`,
    });
  }
  if (type === "integer" && !Number.isInteger(convertedNum)) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Number Type",
      detail: `Number is not the same type as indicated: expected ${type}.`,
    });
  } else if (
    type === "price" &&
    (convertedNum < 0 || !/^\d+(\.\d{1,2})?$/.test(convertedNum.toString()))
  ) {
    throw new ApiError({
      status: 400,
      source: { pointer: "inputValidator.js" },
      title: "Bad Request: Number Type",
      detail: `Number is not the same type as indicated: expected ${type}.`,
    });
  }
};

module.exports = {
  usernameValidator,
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneNumberValidator,
  numberRangeValidator,
};
