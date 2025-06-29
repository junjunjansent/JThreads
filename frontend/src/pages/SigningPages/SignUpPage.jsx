import debug from "debug";
const log = debug("JThreads: SignUpPage");

import { useNavigate, Link } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PATHS } from "../../routes/PATHS";

import styles from "./SigningPage.module.css";
import { toast } from "react-toastify";
import logoImg from "../../assets/JThreads_logo.png";
import { Box, Button, TextField } from "@mui/material";
import ValidatedTextField from "../../components/ValidatedTextField";

import { saveTokenToLocalStorage } from "../../utils/tokenUtil";
import { signUp } from "../../services/publicServices";
import { emailValidator, usernameValidator } from "../../utils/inputValidator";
import { errorUtil } from "../../utils/errorUtil";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [signUpProfile, setSignUpProfile] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const confirmPasswordValidator = (newValue) => {
    if (signUpProfile.password && newValue !== signUpProfile.password) {
      return "Passwords do not match >:(";
    }
    return false;
  };

  const handleChange = (formLabel, value) => {
    setSignUpProfile({ ...signUpProfile, [formLabel]: value });
    log(signUpProfile);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      toast.info("Signing Up for you...");

      const { user, token } = await signUp(signUpProfile);
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={styles["form-field"]}
        >
          <ValidatedTextField
            required
            label="Username"
            value={signUpProfile.username}
            formLabel="username"
            onChange={handleChange}
            validator={usernameValidator}
          />
          <ValidatedTextField
            required
            label="Email"
            value={signUpProfile.email}
            validator={emailValidator}
            formLabel="email"
            onChange={handleChange}
          />
          <TextField
            required
            type="password"
            label="Password"
            autoComplete="current-password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <ValidatedTextField
            required
            type="password"
            label="Confirm Password"
            formLabel="confirmPassword"
            onChange={handleChange}
            validator={confirmPasswordValidator}
          />
          <Button type="submit">CREATE AN ACCOUNT</Button>
        </Box>
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
