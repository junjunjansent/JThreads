import debug from "debug";
const log = debug("JThreads:AboutEditPasswordPage");

import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { PATHS } from "../../../routes/PATHS";

import { UserContext } from "../../../contexts/UserContext";
import ValidatedTextField from "../../../utils/ValidatedTextField";
import { errorUtil } from "../../../utils/errorUtil";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import { toast } from "react-toastify";

import { TextField, Box, Button } from "@mui/material";
import { updateOwnerPassword } from "../../../services/userServices";

const AboutEditPasswordPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [passwordProfile, setPasswordProfile] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const newPasswordValidator = (newValue) => {
    if (
      passwordProfile.newPassword &&
      newValue !== passwordProfile.newPassword
    ) {
      return "Passwords do not match >:(";
    }
    return false;
  };

  const handleChange = (formLabel, value) => {
    setPasswordProfile({
      ...passwordProfile,
      [formLabel]: value,
    });
    log(passwordProfile);
  };

  const handleSubmit = async (event) => {
    // TODO: need to prevent submission if any error TextFields
    try {
      event.preventDefault();
      toast.info("Changing Password for you... so mafan...");
      log(passwordProfile);
      const { user } = await updateOwnerPassword(passwordProfile);
      navigate(PATHS.USER(user.username).ABOUT.DEFAULT);
      toast.success(`Edits Saved :)`);
    } catch (err) {
      errorUtil(err);
    }
  };

  return (
    <>
      <main className={styles["page"]}>
        <section className={styles["section-info"]}>
          <div className={styles["title-bar"]}>
            <h2 className={styles["title-text"]}>
              CHANGE PASSWORD - {user.username}
            </h2>
          </div>
          <div className={styles["descrpition-bar"]}>
            <p className={styles["description-text"]}>Please remember it...</p>
            <div className={styles["descrpition-btns"]}>
              <button
                onClick={() =>
                  navigate(PATHS.USER(user.username).ABOUT.DEFAULT)
                }
              >
                Wasted My Time
              </button>
            </div>
          </div>
          <article>
            <Box
              component="form"
              onSubmit={handleSubmit}
              className={styles["form-field"]}
            >
              <TextField
                required
                type="password"
                label="Old Password"
                autoComplete="current-password"
                onChange={(e) => handleChange("oldPassword", e.target.value)}
              />
              <TextField
                required
                type="password"
                label="New Password"
                autoComplete="current-password"
                onChange={(e) => handleChange("newPassword", e.target.value)}
              />
              <ValidatedTextField
                required
                type="password"
                label="Confirm New Password"
                formLabel="confirmNewPassword"
                onChange={handleChange}
                validator={newPasswordValidator}
              />

              <Button type="submit">Change It</Button>
            </Box>
          </article>
        </section>
        <aside className={styles["aside-img"]}>
          <img src={logoImg} alt="Logo" />
        </aside>
      </main>
    </>
  );
};

export default AboutEditPasswordPage;
