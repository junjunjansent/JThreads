import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import styles from "./RegisterPage.module.css";
import { toast } from "react-toastify";
import logoImg from "../../assets/JThreads_logo.png";

// import debug from "debug";
// const log = debug("JThreads:file destination");

import { signUp, saveTokenToLocalStorage } from "../../services/publicServices";
import { errorUtil } from "../../utils/errorUtil";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      toast.info("Signing Up for you...");

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      const { user, token } = await signUp(data);
      setUser(user);
      saveTokenToLocalStorage(token);
      navigate(`/${user.username}`);
      toast.success(`Welcome, ${user.username}`);
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
      <div>
        <img
          src={logoImg}
          alt="Logo"
          style={{
            width: "100%",
            maxWidth: "20rem", // limit max width to 400px
            maxHeight: "20rem", // limit max height to 300px
            objectFit: "contain", // keep aspect ratio, no cropping
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
