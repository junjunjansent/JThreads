import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PATHS } from "../../../routes/PATHS";

import ValidatedTextField from "../../../utils/ValidatedTextField";
import {
  usernameValidator,
  emailValidator,
} from "../../../utils/inputValidator";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import dayjs from "dayjs";

import { List, Select, TextField, Box, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const AboutEditProfilePage = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    (userProfile.birthday = userProfile.birthday
      ? userProfile.birthday.toDate()
      : null),
      console.log("Submitted:", userProfile);
  };

  const userInfoGroups = [
    [
      { label: "Username", formLabel: "username", value: userProfile.username },
      { label: "Email", formLabel: "email", value: userProfile.email },
    ],
    [
      {
        label: "First Name",
        formLabel: "firstName",
        value: userProfile.firstName ?? "-",
      },
      {
        label: "Last Name",
        formLabel: "lastName",
        value: userProfile.lastName ?? "-",
      },
      {
        label: "Gender",
        formLabel: "gender",
        date: "select",
        value: userProfile.gender ?? "-",
      },
    ],
    [
      {
        label: "Phone Number",
        formLabel: "phoneNumber",
        date: "number",
        value: userProfile.phoneNumber ?? "-",
      },
      {
        label: "Birthday",
        formLabel: "birthday",
        type: "date",
        value: userProfile.birthday ?? null,
      },
    ],
    [
      {
        label: "Default Shipping Address",
        formLabel: "defaultShippingAddress",
        value: userProfile.defaultShippingAddress ?? "-",
      },
      {
        label: "Profile Photo",
        formLabel: "profilePhoto",
        value: userProfile.profilePhoto ?? "-",
      },
    ],
  ];

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
                    onChange={(e) =>
                      handleChange("username", e.target.value.trim())
                    }
                    validator={usernameValidator}
                  />
                  <ValidatedTextField
                    required
                    label="Email"
                    value={userProfile.email}
                    validator={emailValidator}
                    onChange={(e) =>
                      handleChange("email", e.target.value.trim())
                    }
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

                {userInfoGroups.map((group, index) => (
                  <List key={index} className={styles["list-row-style"]}>
                    {group.map(({ label, formLabel, value, type }) => {
                      if (type === "date") {
                        return (
                          <DesktopDatePicker
                            key={formLabel}
                            label={label}
                            value={value}
                            onChange={(newValue) =>
                              handleChange(formLabel, newValue)
                            }
                            slotProps={{
                              textField: {
                                fullWidth: true,
                              },
                            }}
                          />
                        );
                      } else if (formLabel === "gender") {
                        return (
                          <Select
                            key={formLabel}
                            label={label}
                            value={value}
                            onChange={(e) =>
                              handleChange(formLabel, e.target.value)
                            }
                          >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                            <MenuItem value="X">X</MenuItem>
                          </Select>
                        );
                      } else {
                        return (
                          <TextField
                            key={formLabel}
                            label={label}
                            value={value}
                            onChange={(e) =>
                              handleChange(formLabel, e.target.value)
                            }
                          />
                        );
                      }
                    })}
                  </List>
                ))}
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
