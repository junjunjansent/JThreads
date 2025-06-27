import { PATHS } from "../../../routes/PATHS";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";

const AboutPage = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.loginarea}>
          <h2 className={styles.pagetitle}>JOIN US TODAY</h2>
          <p className={styles.pagedescription}>
            Log in to enjoy a personalized experience and to access all our
            services.
          </p>
          {/* <form onSubmit={handleSubmit}>
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
              autoComplete="off"
              name="password"
              placeholder="PASSWORD"
            ></input>
            <button className={styles.submitbutton}>SIGN UP</button>
            <Link className={styles.register} to={PATHS.PUBLIC.SIGN_IN}>
              Already have an account, log in now!
            </Link>
          </form> */}
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
    </>
  );
};

export default AboutPage;
