// import debug from "debug";
// const log = debug("JThreads:AboutEditProfilePage");

import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PATHS } from "../../../routes/PATHS";

import ValidatedTextField from "../../../components/ValidatedTextField";
import {
  usernameValidator,
  emailValidator,
  nameValidator,
  phoneNumberValidator,
} from "../../../utils/inputValidator";
import { UserContext } from "../../../contexts/UserContext";
import { errorUtil } from "../../../utils/errorUtil";
import { saveTokenToLocalStorage } from "../../../utils/tokenUtil";
import { GENDER_TYPES } from "../../../../../sharedConstants/gender";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import {
  Select,
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { updateOwnerProfile } from "../../../services/userServices";

const AboutEditProfilePage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // state passed from About Page
  const location = useLocation();
  const user = location.state?.userProfile ?? null;

  const [userProfile, setUserProfile] = useState({
    ...user,
    birthday: user?.birthday ? dayjs(user.birthday) : null,
  });
  const [formValidity, setFormValidity] = useState({
    username: true,
    email: true,
  });

  const handleChange = (formLabel, newValue) => {
    setUserProfile({
      ...userProfile,
      [formLabel]: newValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // need to prevent submission if any error TextFields
    const isFormValid = Object.values(formValidity).every(
      (isInputValid) => isInputValid
    );
    if (!isFormValid) {
      toast.error("Cannot Submit Form. Check your inputs!");
      return;
    }

    try {
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
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <ValidatedTextField
                      required
                      label="Username"
                      value={userProfile.username}
                      formLabel="username"
                      onChange={handleChange}
                      validator={usernameValidator}
                      formValidityState={formValidity}
                      formValidityStateSetter={setFormValidity}
                    />
                  </Grid>
                  <Grid size={6}>
                    <ValidatedTextField
                      required
                      label="Email"
                      value={userProfile.email}
                      validator={emailValidator}
                      formLabel="email"
                      onChange={handleChange}
                      formValidityState={formValidity}
                      formValidityStateSetter={setFormValidity}
                    />
                  </Grid>

                  <Grid size={4}>
                    <ValidatedTextField
                      label="First Name"
                      value={userProfile.firstName}
                      validator={nameValidator}
                      formLabel="firstName"
                      onChange={handleChange}
                      formValidityState={formValidity}
                      formValidityStateSetter={setFormValidity}
                    />
                  </Grid>
                  <Grid size={4}>
                    <ValidatedTextField
                      label="Last Name"
                      value={userProfile.lastName}
                      validator={nameValidator}
                      formLabel="lastName"
                      onChange={handleChange}
                      formValidityState={formValidity}
                      formValidityStateSetter={setFormValidity}
                    />
                  </Grid>
                  <Grid size={4}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        label="Gender"
                        value={userProfile.gender ?? ""}
                        onChange={(e) =>
                          handleChange(
                            "gender",
                            e.target.value === "" ? null : e.target.value
                          )
                        }
                      >
                        <MenuItem value="">None</MenuItem>
                        {GENDER_TYPES.map((value) => (
                          <MenuItem value={value}>{value}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={6}>
                    <ValidatedTextField
                      label="Phone Number"
                      value={userProfile.phoneNumber}
                      validator={phoneNumberValidator}
                      formLabel="phoneNumber"
                      onChange={handleChange}
                      formValidityState={formValidity}
                      formValidityStateSetter={setFormValidity}
                    />
                  </Grid>
                  <Grid size={6}>
                    <div className={styles["date-picker-reset"]}>
                      <DesktopDatePicker
                        disableFuture
                        minDate={dayjs().subtract(100, "year")}
                        label="Birthday"
                        value={userProfile.birthday}
                        onChange={(newDate) =>
                          handleChange("birthday", newDate)
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid size={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Default Shipping Address"
                        value={userProfile.defaultShippingAddress ?? ""}
                        onChange={(e) =>
                          handleChange(
                            "defaultShippingAddress",
                            e.target.value.trim() || null
                          )
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Profile Photo (as a link)"
                        value={userProfile.profilePhoto ?? ""}
                        onChange={(e) =>
                          handleChange(
                            "profilePhoto",
                            e.target.value.trim() || null
                          )
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Button type="submit">Change It</Button>
                </Grid>
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
