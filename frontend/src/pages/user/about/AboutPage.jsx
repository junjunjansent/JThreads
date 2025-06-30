import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PATHS } from "../../../routes/PATHS";
import { showOwnerProfile } from "../../../services/userServices";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import dayjs from "dayjs";
import { Avatar, List } from "@mui/material";
import InfoTextCard from "../../../components/InfoTextCard";

import { errorUtil } from "../../../utils/errorUtil";
import Loader from "../../../components/Loader";
import ErrorPage from "../../ErrorPage";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";

const AboutPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [pageStatus, setPageStatus] = useState(PageStatusTypes.LOADING);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const getOwnerInfo = async () => {
      try {
        setPageStatus(PageStatusTypes.LOADING);
        const { user } = await showOwnerProfile();
        setUserProfile(user);
        setPageStatus(PageStatusTypes.OK);
      } catch (err) {
        setPageStatus(PageStatusTypes.ERROR);
        errorUtil(err);
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
        value: userProfile.birthday
          ? dayjs(userProfile.birthday).format("D MMM YYYY")
          : "-",
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
            <h2 className={styles["title-text"]}>
              ABOUT YOURSELF, {userProfile.username}
            </h2>
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
                  <InfoTextCard key={i} label={label} value={value} />
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
