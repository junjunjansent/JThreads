import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";
import { PATHS } from "../../../routes/PATHS";

import { showOwnerCart } from "../../../services/cartServices";
import { errorUtil } from "../../../utils/errorUtil";

import styles from "./CartCheckout.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import Loader from "../../../components/Loader";
import ErrorPage from "../../ErrorPage";
import { UserContext } from "../../../contexts/UserContext";

const BuyCartPage = () => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [pageStatus, setPageStatus] = useState(PageStatusTypes.LOADING);
  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      const controller = new AbortController();
      try {
        setPageStatus(PageStatusTypes.LOADING);
        const { cart } = await showOwnerCart();
        setCart(cart);
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

    getCart();
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
    <main className={styles["page"]}>
      <section className={styles["section-info"]}>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
        {cart ? (
          <>
            <h2 className={styles["title-text"]}>{user.username}'s Cart</h2>
            <p className={styles["description-text"]}>Editing this</p>
            <div className={styles["descrpition-btns"]}>
              <button onClick={() => navigate(PATHS.PUBLIC.BUY.PRODUCT_ALL)}>
                To More Capitalism
              </button>
              <button
                onClick={() =>
                  navigate(PATHS.USER(user.username).BUYER.CHECKOUT)
                }
              >
                Take My Money
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles["title-text"]}>Nothing in your Cart</h2>
            <p className={styles["description-text"]}>
              So weird... never buy things before ah. Go shop lah.
            </p>
            <button onClick={() => navigate(PATHS.PUBLIC.BUY.PRODUCT_ALL)}>
              To Capitalism
            </button>
          </>
        )}
      </section>
      <aside className={styles["aside-img"]}>
        <img src={logoImg} alt="Logo" />
      </aside>
    </main>
  );
};

export default BuyCartPage;
