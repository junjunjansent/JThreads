import styles from "./RegisterPage.module.css";
import { useContext } from "react";

const SignUp = async (data) => {
  const { setUser } = useContext(UserContext);

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
    setUser(json);
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

    await SignUp(data);
  };
  return (
    <div className={styles.page}>
      <div className={styles.loginarea}>
        <h2 className={styles.pagetitle}>JOIN US TODAY</h2>
        <p className={styles.pagedescription}>
          Log in to enjoy a personalized experience and to access all our
          services.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.inputfield}
            type="text"
            name="username"
            placeholder="USERNAME"
          ></input>
          <input
            className={styles.inputfield}
            type="text"
            name="email"
            placeholder="EMAIL"
          ></input>
          <input
            className={styles.inputfield}
            type="text"
            name="password"
            placeholder="PASSWORD"
          ></input>
          <button className={styles.submitbutton}>SIGN UP</button>
          <a href="/login" className={styles.register}>
            <p>Already have an account, log in now!</p>
          </a>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
