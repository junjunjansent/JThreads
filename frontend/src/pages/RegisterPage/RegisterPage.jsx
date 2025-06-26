import { useNavigate } from "react-router";
import styles from "./RegisterPage.module.css";
import debug from "debug";
const log = debug("JThreads:file destination");

import { signUp } from "../../services/publicServices";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    log("happening");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    log(data);

    const { newUser, token } = await signUp(data);
    //TODO: put token into local storage and set user
    navigate(`/${newUser.username}`);
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
            type="password"
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
