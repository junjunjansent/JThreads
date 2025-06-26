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
    const { status, title, detail } = data.errors[0];
    throw new Error(`Error code ${status}: ${title} - ${detail}`);
  } else if (!res.ok) {
    throw new Error("Error fetching in publicService");
  }
  return data;
};

// ------- actual Services

const signUp = async (bodyData) => {
  // const { setUser } = useContext(UserContext);

  const url = `${publicService_BASE_URL}/sign-up`;

  try {
    const resData = await fetchJson(url, "POST", bodyData);
    const { newUser, token } = resData.user;
    return { newUser, token };
  } catch (err) {
    console.error(err.message);
  }
};

export { signUp };
