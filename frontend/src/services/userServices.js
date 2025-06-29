import { ApiError } from "../utils/errorUtil";
import { getTokenFromLocalStorage } from "../utils/tokenUtil";

const userService_BASE_URL = `${
  import.meta.env.VITE_BACK_END_SERVER_URL
}/users`;

const userService_HEADER = () => {
  const token = getTokenFromLocalStorage();
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

const fetchJson = async (url, methodStr = "GET", bodyData = null) => {
  const options = {
    method: methodStr,
    headers: userService_HEADER(),
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
  const url = `${userService_BASE_URL}/owner`;

  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const updateOwnerProfile = async (bodyData) => {
  const url = `${userService_BASE_URL}/owner`;

  try {
    const resData = await fetchJson(url, "PUT", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const updateOwnerPassword = async (bodyData) => {
  const url = `${userService_BASE_URL}/owner/password`;

  try {
    const resData = await fetchJson(url, "PUT", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

export { showOwnerProfile, updateOwnerProfile, updateOwnerPassword };
