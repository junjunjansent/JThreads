import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import styles from "./SignInPage.module.css";
import { toast } from "react-toastify";
import logoImg from "../../assets/JThreads_logo.png";

import { signIn } from "../../services/publicServices";
import { errorUtil } from "../../utils/errorUtil";
import { saveTokenToLocalStorage } from "../../services/publicServices";
import { PATHS } from "../../routes/PATHS";

const SignInPage = () => {
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
            autoComplete="off"
            name="password"
            placeholder="PASSWORD"
          ></input>
          <button className={styles.submitbutton}>LOG IN</button>
        </form>
        <Link className={styles.register} to={PATHS.PUBLIC.SIGN_UP}>
          Create an account lah bodoh...
        </Link>
      </div>

      <div>
        <img
          src={logoImg}
          alt="Logo"
          style={{
            width: "100%",
            maxWidth: "20rem",
            maxHeight: "20rem",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default SignInPage;
