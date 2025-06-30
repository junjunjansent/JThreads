import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";
import { PATHS } from "../../../routes/PATHS";

import { showOwnerCart } from "../../../services/cartServices";
import { errorUtil } from "../../../utils/errorUtil";

import styles from "./CartCheckout.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import dayjs from "dayjs";
import Loader from "../../../components/Loader";
import ErrorPage from "../../ErrorPage";

const BuyerCartPage = () => {
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
        {cart ? (
          <>
            <h2 className={styles["title-text"]}>
              {cart.buyer.username}'s Cart
            </h2>
            <p className={styles["description-text"]}>
              Last updated on {dayjs(cart.updatedAt).format("D MMM YYYY")}
              <br />
              <small>
                Your cart will be emptied after 15 days from last edit.
              </small>
              <br />
              <br />
              <small>
                Note we helped to remove deleted or disabled products (so blame
                the Seller, not us)
              </small>
            </p>
            <div className={styles["descrpition-btns"]}>
              <button onClick={() => navigate(PATHS.PUBLIC.BUY.PRODUCT_ALL)}>
                Indulge in More Capitalism
              </button>
              <button
                onClick={() =>
                  navigate(PATHS.USER(cart.buyer.username).BUYER.CHECKOUT)
                }
              >
                Take My Money
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles["title-text"]}>Empty Cart</h2>
            <p className={styles["description-text"]}>
              So weird... never buy things before ah. Go shop lah.
            </p>
            <button onClick={() => navigate(PATHS.PUBLIC.BUY.PRODUCT_ALL)}>
              To Capitalism
            </button>
          </>
        )}
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </section>
      <aside className={styles["aside-img"]}>
        <img src={logoImg} alt="Logo" />
      </aside>
    </main>
  );
};

export default BuyerCartPage;
