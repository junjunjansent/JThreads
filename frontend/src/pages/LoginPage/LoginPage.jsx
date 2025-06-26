import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import styles from "./LoginPage.module.css";
import { toast } from "react-toastify";
import logoImg from "../../assets/JThreads_logo.png";

import { signIn } from "../../services/publicServices";
import { errorUtil } from "../../utils/errorUtil";
import { saveTokenToLocalStorage } from "../../services/publicServices";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      toast.info("Signing Up for you...");

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      const { user, token } = await signIn(data);
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
        <h2 className={styles.pagetitle}>LOG-IN</h2>
        <p className={styles.pagedescription}>
          Log in to enjoy a personalized experience and to access all our
          services.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.inputfield}
            type="text"
            name="usernameOrEmail"
            placeholder="USERNAME or EMAIL"
          ></input>
          <input
            className={styles.inputfield}
            type="password"
            name="password"
            placeholder="PASSWORD"
          ></input>
          <button className={styles.submitbutton}>LOG IN</button>
          <a href="/register" className={styles.register}>
            <p>Create an account</p>
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

export default LoginPage;
