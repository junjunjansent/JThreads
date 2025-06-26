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
  if (!res.ok && data.errors) {
    return data.errors[0];
  } else if (!res.ok) {
    throw new Error("Error fetching in publicService");
  }
  return data;
};
// ------- actual Services
const getAllProducts = async () => {
  const url = `${publicService_BASE_URL}/api/products`;
  try {
    const resData = await fetchJson(url, "GET");
    return resData;
  } catch (err) {
    console.error(err);
  }
};
export { getAllProducts };
