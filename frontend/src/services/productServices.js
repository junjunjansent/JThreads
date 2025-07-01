import { ApiError } from "../utils/errorUtil";
import { getTokenFromLocalStorage } from "../utils/tokenUtil";

const productService_BASE_URL = `${
  import.meta.env.VITE_BACK_END_SERVER_URL
}/products`;

const productService_HEADER = () => {
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
    headers: productService_HEADER(),
  };

  if (methodStr === "POST" || methodStr === "PUT") {
    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    } else {
      throw new ApiError({
        status: 405,
        source: { pointer: "productServices.js" },
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

const createProduct = async (bodyData) => {
  const url = `${productService_BASE_URL}`;

  try {
    const resData = await fetchJson(url, "POST", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const editProduct = async (bodyData, productId) => {
  const url = `${productService_BASE_URL}/${productId}`;

  try {
    const resData = await fetchJson(url, "PUT", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};

const createVariant = async (bodyData, productId) => {
  const url = `${productService_BASE_URL}/${productId}`;

  try {
    const resData = await fetchJson(url, "POST", bodyData);
    return resData;
  } catch (err) {
    throw new ApiError(err);
  }
};
export { createProduct, editProduct, createVariant };
