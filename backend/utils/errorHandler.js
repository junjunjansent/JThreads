// export interface ErrorType {
//     status: string;
//     source?: { pointer: string };
//     title: string;
//     detail: string;
//   }

// Defining Middleware Error Handler

class ApiError extends Error {
  constructor({ status, source, title, detail }) {
    super(detail); // sets this.message = detail
    this.name = this.constructor.name;
    this.status = status || 500;
    this.source = source || {};
    this.title = title || "Server Error";
    this.detail = detail || "Something went wrong"; // duplicated, but its ok based on desired ErrorType
  }
}

const mongooseErrors = ["CastError", "ValidationError", "ValidatorError"];
const jwtErrors = ["JsonWebTokenError", "TokenExpiredError"];

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode =
    Number(err.status) ||
    mongooseErrors.includes(err.name) ||
    jwtErrors.includes(err.name)
      ? 400
      : 500;

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      errors: [
        // can help handle multiple errors, defined by JSON:API convention but too complicated lol
        {
          status: String(statusCode),
          source: err.source,
          title: err.title,
          detail: err.message,
        },
      ],
    });
  } else {
    return res.status(statusCode).json({
      errors: [
        {
          status: String(statusCode),
          source: err.stack
            ? { pointer: err.stack.split("at ")[1]?.trim() }
            : {},
          title: err.name || "Server Error",
          detail: err.message || "Something went wrong.",
        },
      ],
    });
  }
};

// if any errors, call
// throw new ApiError({
//     status: <status code>,
//     source: { pointer: <file location> },
//     title: 'Invalid <xxx>',
//     detail: '<description>',
//   });
// then in catch blocks, next(err)

module.exports = { ApiError, errorHandler };
