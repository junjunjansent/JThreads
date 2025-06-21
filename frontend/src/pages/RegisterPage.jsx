// Creating a sign up function

const signUp = async (data) => {
  const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/sign-up`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
};

const RegisterPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    await signUp(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Sign Up</legend>

        <label>
          Username <input name="username" />
        </label>
        <br />
        <label>
          Email <input name="email" type="text" />
        </label>
        <br />
        <label>
          Password <input name="password" type="text" />
        </label>
        <br />

        <button>Sign Up</button>
      </fieldset>
    </form>
  );
};

export default RegisterPage;
