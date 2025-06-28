import { ApiError } from "../utils/errorUtil";
import { getTokenFromLocalStorage } from "./publicServices";

const publicService_BASE_URL = `${
  import.meta.env.VITE_BACK_END_SERVER_URL
}/users`;

const publicService_HEADER = (token = null) => {
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

const fetchJson = async (
  url,
  methodStr = "GET",
  token = null,
  bodyData = null
) => {
  const options = {
    method: methodStr,
    headers: publicService_HEADER(token),
  };

  if (methodStr === "POST" || methodStr === "PUT") {
    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    } else {
      throw new ApiError({
        status: 405,
        source: { pointer: "userServices.js" },
        title: "Method Not Allowed",
        detail: "Need Body Data for this method.",
      });
    }
  }

  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    throw ApiError.fromFetchResponses(data);
  }

  return data;
};

// ----------- actual Services

const showOwnerProfile = async () => {
  // private Router should have protected any unauthorised getting in
  const url = `${publicService_BASE_URL}/owner`;
  const token = getTokenFromLocalStorage();

  try {
    const resData = await fetchJson(url, "GET", token);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const updateOwnerProfile = async (bodyData) => {
  const url = `${publicService_BASE_URL}/owner`;
  const token = getTokenFromLocalStorage();

  try {
    const resData = await fetchJson(url, "PUT", token, bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const updateOwnerPassword = async (bodyData) => {
  const url = `${publicService_BASE_URL}/owner/password`;
  const token = getTokenFromLocalStorage();

  try {
    const resData = await fetchJson(url, "PUT", token, bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

export { showOwnerProfile, updateOwnerProfile, updateOwnerPassword };
