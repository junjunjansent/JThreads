import { useContext } from "react";
import { useNavigate } from "react-router";
import { PATHS } from "../../routes/PATHS";

import styles from "./general.module.css";
import logoImg from "../../assets/JThreads_logo.png";
import { UserContext } from "../../contexts/UserContext";

const UnauthPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <main className={styles["page"]}>
        <section className={styles["section-info"]}>
          <h1 className={styles["title-text"]}>
            About This Page You're Looking For..
          </h1>
          <p className={styles["description-text"]}>
            Why don't you check where you're going babes
          </p>
          <div className={styles["descrpition-btns"]}>
            {user ? (
              <>
                <button
                  onClick={() =>
                    navigate(PATHS.PUBLIC.USER_SHOP(user.username))
                  }
                >
                  Don't be nosy ah
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate(PATHS.PUBLIC.SIGN_UP)}>
                  Don't have an Account? what an L...
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

export default UnauthPage;
