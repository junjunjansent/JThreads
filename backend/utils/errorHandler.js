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
    this.title = title || "Error";
    this.detail = detail || "An error occurred"; // duplicated, but its ok based on desired ErrorType
  }
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      errors: [
        // can help handle multiple errors, defined by JSON:API convention but too complicated lol
        {
          status: String(err.status),
          source: err.source,
          title: err.title,
          detail: err.message,
        },
      ],
    });
  } else {
    return res.status(500).json({
      errors: [
        {
          status: "500",
          title: "Server Error",
          detail: "Something went wrong.",
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
