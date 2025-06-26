class ApiError extends Error {
  constructor({ status, source, title, detail }) {
    super(detail); // sets this.message = detail
    this.name = this.constructor.name;
    this.status = status || 500;
    this.source = source || {};
    this.title = title || "Server Error";
    this.detail = detail || "Something went wrong"; // duplicated, but its ok based on desired ErrorType
  }

  static fromFetchResponses(resError) {
    // when I know it already follows the ApiError as defined in Backend
    if (!resError.errors[0] || !Array.isArray(resError.errors)) {
      return new ApiError({});
      // const { status, title, detail } = err.errors[0];
      // throw new Error(`Error code ${status}: ${title} - ${detail}`);
    } else {
      const errorFullDetails = resError.errors[0];
      return new ApiError(errorFullDetails);
    }
  }
}

// ---------- Show error in react-toastify

import { toast } from "react-toastify";

const errorUtil = (err, message = "Unexpected error") => {
  console.error(err);
  if (err instanceof ApiError) {
    toast.error(`${err.title}: ${err.detail} - Error ${err.status}`);
  } else {
    toast.error(`${err.name || "Unknown"}: ${message}`);
  }
};

export { ApiError, errorUtil };
