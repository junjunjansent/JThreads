import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PATHS } from "../../routes/PATHS";

import styles from "./general.module.css";
import { toast } from "react-toastify";
import logoImg from "../../assets/JThreads_logo.png";

import { signIn } from "../../services/publicServices";
import { errorUtil } from "../../utils/errorUtil";
import { saveTokenToLocalStorage } from "../../utils/tokenUtil";

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
          <h2 className={styles["title-text"]}>LOG-IN</h2>
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
            name="usernameOrEmail"
            placeholder="USERNAME or EMAIL"
          ></input>
          <input
            className={styles["input-field"]}
            type="password"
            autoComplete="off"
            name="password"
            placeholder="PASSWORD"
          ></input>
          <button className={styles["submit-button"]}>LOG IN</button>
        </form>
        <Link className={styles["link-signing-page"]} to={PATHS.PUBLIC.SIGN_UP}>
          Create an account lah bodoh...
        </Link>
      </section>

      <aside className={styles["aside-img"]}>
        <img src={logoImg} alt="Logo" />
      </aside>
    </main>
  );
};

export default SignInPage;
