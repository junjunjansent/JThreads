import { ApiError } from "../utils/errorUtil";

const publicService_BASE_URL = `${
  import.meta.env.VITE_BACK_END_SERVER_URL
}/public`;

const publicService_HEADER = {
  "Content-Type": "application/json",
};

const fetchJson = async (url, methodStr = "GET", bodyData = null) => {
  const options = {
    method: methodStr,
    headers: publicService_HEADER,
  };

  if (methodStr === "POST" || methodStr === "PUT") {
    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    } else {
      throw new ApiError({
        status: 405,
        source: { pointer: "publicServices.js" },
        title: "Method Not Allowed",
        detail: "Need Body Data for this method.",
      });
    }
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

const getAllProducts = async () => {
  const url = `${publicService_BASE_URL}/api/products`;
  try {
    const resData = await fetchJson(url, "GET");
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
    localStorage.removeItem("token");
  }
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return null;
  }
};

const getInfoFromToken = (token) => {
  if (token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
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
  getAllProducts,
};
