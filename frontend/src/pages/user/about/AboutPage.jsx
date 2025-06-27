import { PATHS } from "../../../routes/PATHS";

import { useNavigate } from "react-router";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import { useEffect, useState } from "react";
import { errorUtil } from "../../../utils/errorUtil";
import Loader from "../../../components/Loader";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";
import ErrorPage from "../../ErrorPage";
import { showOwnerProfile } from "../../../services/userServices";
import dayjs from "dayjs";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const AboutPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [pageStatus, setPageStatus] = useState(PageStatusTypes.LOADING);
  const navigate = useNavigate();

  useEffect(() => {
    const getOwnerInfo = async () => {
      const controller = new AbortController();
      try {
        setPageStatus(PageStatusTypes.LOADING);
        const { user } = await showOwnerProfile();
        setUserProfile(user);
      } catch (err) {
        setPageStatus(PageStatusTypes.ERROR);
        errorUtil(err);
      } finally {
        setPageStatus(PageStatusTypes.OK);
      }

      return () => {
        // Cleanup on unmount
        controller.abort();
      };
    };

    getOwnerInfo();
  }, []);

  switch (pageStatus) {
    case PageStatusTypes.LOADING:
      return <Loader />;
    case PageStatusTypes.ERROR:
      return <ErrorPage />;
    default:
      break;
  }

  const userInfoGroups = [
    [
      { label: "Username", value: userProfile.username },
      { label: "Email", value: userProfile.email },
    ],
    [
      { label: "First Name", value: userProfile.firstName ?? "-" },
      { label: "Last Name", value: userProfile.lastName ?? "-" },
      { label: "Gender", value: userProfile.gender ?? "-" },
    ],
    [
      { label: "Phone Number", value: userProfile.phoneNumber ?? "-" },
      {
        label: "Birthday",
        value: dayjs(userProfile.birthday).format("D MMM YYYY") ?? "-",
      },
    ],
    [
      {
        label: "Default Shipping Address",
        value: userProfile.defaultShippingAddress ?? "-",
      },
    ],
  ];

  return (
    <>
      <main className={styles["page"]}>
        <section className={styles["section-info"]}>
          <div className={styles["title-bar"]}>
            <Avatar alt="Profile Photo" src={userProfile.profilePhoto} />
            <h2 className={styles["title-text"]}>ABOUT YOURSELF</h2>
          </div>
          <div className={styles["descrpition-bar"]}>
            <p className={styles["description-text"]}>
              Joined us on {dayjs(userProfile.createdAt).format("D MMM YYYY")}
            </p>
            <div className={styles["descrpition-btns"]}>
              <button
                onClick={() =>
                  navigate(
                    PATHS.USER(userProfile.username).ABOUT.EDIT_PROFILE,
                    { state: { userProfile } }
                  )
                }
              >
                Edit Profile
              </button>
              <button
                onClick={() =>
                  navigate(PATHS.USER(userProfile.username).ABOUT.EDIT_PASSWORD)
                }
              >
                Change Password
              </button>
            </div>
          </div>

          <article>
            {userInfoGroups.map((group, index) => (
              <List key={index} className={styles["list-row-style"]}>
                {group.map(({ label, value }, i) => (
                  <ListItem key={i} alignItems="flex-start">
                    <ListItemText
                      primary={value}
                      secondary={
                        <span
                          style={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.7rem",
                          }}
                        >
                          {label}
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ))}
          </article>
        </section>
        <aside className={styles["aside-img"]}>
          <img src={logoImg} alt="Logo" />
        </aside>
      </main>
      {/* <pre>{JSON.stringify(userProfile, null, 2)}</pre> */}
    </>
  );
};

export default AboutPage;
