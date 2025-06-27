// import debug from "debug";
// const log = debug("JThreads:AboutEditProfilePage");

import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PATHS } from "../../../routes/PATHS";

import ValidatedTextField from "../../../utils/ValidatedTextField";
import {
  usernameValidator,
  emailValidator,
} from "../../../utils/inputValidator";
import { errorUtil } from "../../../utils/errorUtil";
import { UserContext } from "../../../contexts/UserContext";
import { saveTokenToLocalStorage } from "../../../services/publicServices";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { List, Select, TextField, Box, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { updateOwnerProfile } from "../../../services/userServices";

const AboutEditProfilePage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.userProfile ?? null;
  const [userProfile, setUserProfile] = useState({
    ...user,
    birthday: user?.birthday ? dayjs(user.birthday) : null,
  });

  const handleChange = (formLabel, value) => {
    setUserProfile({
      ...userProfile,
      [formLabel]: value,
    });
  };

  const handleSubmit = async (event) => {
    // need to prevent submission if any error TextFields
    try {
      event.preventDefault();
      (userProfile.birthday = userProfile.birthday
        ? userProfile.birthday.toDate()
        : null),
        toast.info("Updating for you...");

      const { user, token } = await updateOwnerProfile(userProfile);
      setUser(user);
      saveTokenToLocalStorage(token);
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
            <h2 className={styles["title-text"]}>EDIT PROFILE</h2>
          </div>
          <div className={styles["descrpition-bar"]}>
            <p className={styles["description-text"]}>
              Last Updated on{" "}
              {dayjs(userProfile.updatedAt).format("D MMM YYYY")}
            </p>
            <div className={styles["descrpition-btns"]}>
              <button
                onClick={() =>
                  navigate(PATHS.USER(userProfile.username).ABOUT.DEFAULT)
                }
              >
                Wasted My Time
              </button>
            </div>
          </div>
          <article>
            <Box component="form" onSubmit={handleSubmit}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <List className={styles["list-row-style"]}>
                  <ValidatedTextField
                    required
                    label="Username"
                    value={userProfile.username}
                    formLabel="username"
                    onChange={handleChange}
                    validator={usernameValidator}
                  />
                  <ValidatedTextField
                    required
                    label="Email"
                    value={userProfile.email}
                    validator={emailValidator}
                    formLabel="email"
                    onChange={handleChange}
                  />
                </List>
                <List className={styles["list-row-style"]}>
                  <TextField
                    label="First Name"
                    value={userProfile.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                  <TextField
                    label="Last Name"
                    value={userProfile.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                  <Select
                    label="Gender"
                    value={userProfile.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                    <MenuItem value="X">X</MenuItem>
                  </Select>
                </List>
                <List className={styles["list-row-style"]}>
                  <TextField
                    label="Phone Number"
                    value={userProfile.phoneNumber}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                  />
                  <DesktopDatePicker
                    label="Birthday"
                    value={userProfile.birthday}
                    onChange={(newDate) => handleChange("birthday", newDate)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </List>

                <List className={styles["list-row-style"]}>
                  <TextField
                    label="Default Shipping Address"
                    value={userProfile.defaultShippingAddress}
                    onChange={(e) =>
                      handleChange("defaultShippingAddress", e.target.value)
                    }
                  />
                  <TextField
                    label="Profile Photo"
                    value={userProfile.profilePhoto}
                    onChange={(e) =>
                      handleChange("profilePhoto", e.target.value)
                    }
                  />
                </List>

                <button type="submit">Change It</button>
              </LocalizationProvider>
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

export default AboutEditProfilePage;
