import { useContext } from "react";
import { useNavigate } from "react-router";
import { PATHS } from "../../routes/PATHS";

import styles from "./general.module.css";
import logoImg from "../../assets/JThreads_logo.png";
import { UserContext } from "../../contexts/UserContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <main className={styles["page"]}>
        <section className={styles["section-info"]}>
          <h1 className={styles["title-text"]}>Welcome to JThreads</h1>
          <p className={styles["description-text"]}>
            Welcome fellow sigmas, to this bussin' website. For we are a page
            that will not incur you any Fanum Tax, cause we ain't like those
            other capping delulu websites.
            {/* <small>
              {" "}
              (Seriously tho, the rest can just put the fries in the bag and
              touch grass, bruh.)
            </small> */}
          </p>
          {/* <p className={styles["description-text"]}>
            As you endure their dogwater, please peruse this glorious server and
            find the best quality, very demure, products from the streets of
            Ohio, perfectly fitted for your bods and gyatts. Of course, I may be
            biased so I might be overglazin' or rizzin' myself up, but we built
            this site brick by brick and can assure you that, as you scroll, we
            will manifest for you not to go bald.
          </p>
          <p className={styles["description-text"]}>
            Ok, enough mogging on others and edging you, we don't wanna give you
            the ick. We'll stop this yapquest of a gooning sesh and let you
            explore this pogchamp of a site. Stay GOATED, king.
          </p> */}
          <p>- Skibidi you on the server.</p>
          <div className={styles["descrpition-btns"]}>
            {user ? (
              <>
                <button
                  onClick={() =>
                    navigate(PATHS.USER(user.username).ABOUT.DEFAULT)
                  }
                >
                  Already Logged In
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate(PATHS.PUBLIC.SIGN_UP)}>
                  Sign Up here!
                </button>
                <button onClick={() => navigate(PATHS.PUBLIC.SIGN_IN)}>
                  Login like a W
                </button>{" "}
              </>
            )}
          </div>
        </section>

        <aside className={styles["aside-img"]}>
          <img src={logoImg} alt="Logo" />
        </aside>
      </main>
    </>
  );
};

export default HomePage;
