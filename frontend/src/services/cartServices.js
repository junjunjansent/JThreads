import { ApiError } from "../utils/errorUtil";
import { getTokenFromLocalStorage } from "../utils/tokenUtil";

const cartService_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cart`;

const cartService_HEADER = () => {
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
    headers: cartService_HEADER(),
  };

  if (methodStr === "POST" || methodStr === "PUT") {
    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    } else {
      throw new ApiError({
        status: 405,
        source: { pointer: "cartServices.js" },
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

const showOwnerCart = async () => {
  // private Router should have protected any unauthorised getting in
  const url = `${cartService_BASE_URL}`;

  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const createOwnerCart = async (bodyData) => {
  const url = `${cartService_BASE_URL}`;

  try {
    const resData = await fetchJson(url, "POST", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const destroyOwnerCart = async (cartId) => {
  // private Router should have protected any unauthorised getting in
  const url = `${cartService_BASE_URL}/${cartId}`;

  try {
    const resData = await fetchJson(url, "DELETE");
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

export { showOwnerCart, createOwnerCart, destroyOwnerCart };
