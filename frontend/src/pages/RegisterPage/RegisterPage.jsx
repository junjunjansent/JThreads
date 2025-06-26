import { useNavigate } from "react-router";
import styles from "./RegisterPage.module.css";
import { toast } from "react-toastify";

import debug from "debug";
const log = debug("JThreads:file destination");

import { signUp, saveTokenToLocalStorage } from "../../services/publicServices";
import { errorUtil } from "../../utils/errorUtil";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      toast.info("Signing Up for you...");

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      const { newUser, token } = await signUp(data);
      saveTokenToLocalStorage(token);
      navigate(`/${newUser.username}`);
      toast.success(`Welcome, ${newUser.username}`);
    } catch (err) {
      errorUtil(err);
    }
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
