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

const showUserBasicProfile = async (userUsername) => {
  const url = `${publicService_BASE_URL}/users/${userUsername}`;

  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const getAllProducts = async (searchParams) => {
  // tenerary operator to check if queryString is empty and pass the correct URL with and without query parameters
  const url = searchParams
    ? `${publicService_BASE_URL}/products?search=${searchParams}`
    : `${publicService_BASE_URL}/products`;
  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const getUserProducts = async (userUsername, searchParams) => {
  const url = searchParams
    ? `${publicService_BASE_URL}/${userUsername}?search=${searchParams}`
    : `${publicService_BASE_URL}/${userUsername}`;
  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const getOneIndex = async (productid) => {
  const url = `${publicService_BASE_URL}/products/${productid}`;
  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const getVariantIndex = async (productid) => {
  const url = `${publicService_BASE_URL}/products/${productid}/variants`;
  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

export {
  signUp,
  signIn,
  showUserBasicProfile,
  getAllProducts,
  getUserProducts,
  getOneIndex,
  getVariantIndex,
};
