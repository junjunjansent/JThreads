import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.loginarea}>
        <h2 className={styles.pagetitle}>LOG-IN</h2>
        <p className={styles.pagedescription}>
          Log in to enjoy a personalized experience and to access all our
          services.
        </p>
        <form>
          <input
            className={styles.inputfield}
            type="text"
            name="username"
            placeholder="USERNAME"
          ></input>
          <input
            className={styles.inputfield}
            type="text"
            name="password"
            placeholder="PASSWORD"
          ></input>
          <button className={styles.submitbutton}>LOG IN</button>
          <a href="/register" className={styles.register}>
            <p>Create an account</p>
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
