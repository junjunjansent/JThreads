import { PATHS } from "../../../routes/PATHS";

import styles from "./AboutPage.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import { useEffect, useState } from "react";
import { errorUtil } from "../../../utils/errorUtil";
import Loader from "../../../components/Loader";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";
import ErrorPage from "../../ErrorPage";
import { showOwnerProfile } from "../../../services/userServices";
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
  return (
    <>
      <div className={styles.page}>
        <div className={styles.loginarea}>
          <h2 className={styles.pagetitle}>ABOUT YOURSELF</h2>
          <p className={styles.pagedescription}>
            Joined us on {userProfile.createdAt}
          </p>

          <article>
            <div className={styles.divText}></div>
            <List
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Profile Photo" src={userProfile.profilePhoto} />
                </ListItemAvatar>
                <ListItemText
                  primary={userProfile.username}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Username
                    </span>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={userProfile.email}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Email
                    </span>
                  }
                />
              </ListItem>
            </List>
            <List
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={userProfile.firstName ?? "-"}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      First Name
                    </span>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={userProfile.lastName ?? "-"}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Last Name
                    </span>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={userProfile.gender ?? "-"}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Gender
                    </span>
                  }
                />
              </ListItem>
            </List>
            <List
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={userProfile.phoneNumber ?? "-"}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Phone Number
                    </span>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={userProfile.birthday ?? "-"}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Birthday
                    </span>
                  }
                />
              </ListItem>
            </List>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={userProfile.defaultShippingAddress ?? "-"}
                  secondary={
                    <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Default Shipping Address
                    </span>
                  }
                />
              </ListItem>
            </List>
          </article>

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
              placeholder"EMAIL"
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
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </>
  );
};

export default AboutPage;
