import { ApiError } from "../utils/errorUtil";

const publicService_BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const publicService_HEADER = {
  "Content-Type": "application/json",
};

const fetchJson = async (url, methodStr = "GET", bodyData = null) => {
  const options = {
    method: methodStr,
    headers: publicService_HEADER,
  };

  if (bodyData && methodStr !== "GET") {
    options.body = JSON.stringify(bodyData);
  }

  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    //   if (!res.ok && data.errors) {
    throw ApiError.fromFetchResponses(data);
    // const { status, title, detail } = data.errors[0];
    // throw new Error(`Error code ${status}: ${title} - ${detail}`);
  }
  //   else if (!res.ok) {
  //     throw new Error("Error fetching in publicService");
  //   }
  return data;
};

// ----------- actual Services

const signUp = async (bodyData) => {
  const url = `${publicService_BASE_URL}/sign-up`;

  try {
    const resData = await fetchJson(url, "POST", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const signIn = async (bodyData) => {
  const url = `${publicService_BASE_URL}/sign-in`;

  try {
    const resData = await fetchJson(url, "POST", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

// ----------- token Services

const saveTokenToLocalStorage = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    throw new ApiError({
      status: 403,
      source: { pointer: "Token" },
      title: "Not Found (Token)",
      detail: "Unable to save user token to Local Storage",
    });
  }
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    throw new ApiError({
      status: 403,
      source: { pointer: "Token" },
      title: "Not Found (Token)",
      detail: "Unable to get user token",
    });
  }
};

const getInfoFromToken = (token) => {
  if (token) {
    try {
      return JSON.parse(atob(token.split(".")[1])).payload;
    } catch (err) {
      throw new ApiError({
        status: 403,
        source: { pointer: "Token" },
        title: err.name,
        detail: "Unable to get user token",
      });
    }
  } else {
    throw new ApiError({
      status: 404,
      source: { pointer: "Token" },
      title: "Unauthorized",
      detail: "No user details obtained",
    });
  }
};

export {
  signUp,
  signIn,
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  getInfoFromToken,
};
