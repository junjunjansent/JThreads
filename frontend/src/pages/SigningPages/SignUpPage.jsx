import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import styles from "./SigningPage.module.css";
import { toast } from "react-toastify";
import logoImg from "../../assets/JThreads_logo.png";

// import debug from "debug";
// const log = debug("JThreads:file destination");

import { signUp, saveTokenToLocalStorage } from "../../services/publicServices";
import { errorUtil } from "../../utils/errorUtil";
import { PATHS } from "../../routes/PATHS";

const SignUpPage = () => {
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
      navigate(PATHS.PUBLIC.USER_SHOP(user.username));
      toast.success(`Welcome, ${user.username}`);
    } catch (err) {
      errorUtil(err);
    }
  };
  return (
    <main className={styles["page"]}>
      <section className={styles["section-info"]}>
        <div className={styles["title-bar"]}>
          <h2 className={styles["title-text"]}>JOIN US TODAY</h2>
        </div>
        <div className={styles["descrpition-bar"]}>
          <p className={styles["description-text"]}>
            Log in to enjoy a personalized experience and to access all our
            services.
          </p>
        </div>
        <form className={styles["form-field"]} onSubmit={handleSubmit}>
          <input
            className={styles["input-field"]}
            type="text"
            name="username"
            placeholder="USERNAME"
          ></input>
          <input
            className={styles["input-field"]}
            type="text"
            name="email"
            placeholder="EMAIL"
          ></input>
          <input
            className={styles["input-field"]}
            type="password"
            autoComplete="off"
            name="password"
            placeholder="PASSWORD"
          ></input>
          <button className={styles["submit-button"]}>SIGN UP</button>
        </form>
        <Link className={styles["link-signing-page"]} to={PATHS.PUBLIC.SIGN_IN}>
          Already have an account, log in now!
        </Link>
      </section>
      <aside className={styles["aside-img"]}>
        <img src={logoImg} alt="Logo" />
      </aside>
    </main>
  );
};

export default SignUpPage;
