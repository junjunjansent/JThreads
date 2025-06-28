import { useNavigate } from "react-router";
import { PATHS } from "../../routes/PATHS";

import styles from "./SigningPage.module.css";
import logoImg from "../../assets/JThreads_logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className={styles["page"]}>
        <section className={styles["section-info"]}>
          <div>
            <h1 className={styles["title-text"]}>Welcome to JThreads</h1>
            <p className={styles["description-text"]}>
              Welcome fellow sigmas, to a website that don't be capping. For we
              have a page that will not incur you any Fanum Tax, we aren't like
              all those other capping websites. They should just put the fries
              in the bag and touch grass, bruh. As you endure their dogwater..
              please find the best quality products from the streets of Ohio,
              perfectly fitted for your bods and gyatts. Of course, I may be
              biased so I might be glazin', but we built this site brick by
              brick so we can assure you, as you scroll, we will manifest for
              you not to go bald. Ok, enough mogging of others and edging you,
              maybe even time to stop this yapquest of a gooning sesh. Time for
              you to explore this pogchamp of a site. Stay GOATED, king.
            </p>
            <p>- Skibidi you on the server.</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={() => navigate(PATHS.PUBLIC.SIGN_UP)}>
                Don't have an Account? what an L...
              </button>
              <button onClick={() => navigate(PATHS.PUBLIC.SIGN_IN)}>
                Login like a W
              </button>
            </div>
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
