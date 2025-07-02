// import debug from "debug";
// const log = debug("JThreads:BuyerCartPage");

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";
import { PATHS } from "../../../routes/PATHS";

import {
  destroyOwnerCart,
  showOwnerCart,
} from "../../../services/cartServices";
import { errorUtil } from "../../../utils/errorUtil";

import styles from "./CartCheckout.module.css";
import logoImg from "../../../assets/JThreads_logo.png";
import dayjs from "dayjs";
import Loader from "../../../components/Loader";
import ErrorPage from "../../ErrorPage";
import BuyerCartTable from "./BuyerCartTable";

const BuyerCartPage = () => {
  const [cart, setCart] = useState(null);
  const [pageStatus, setPageStatus] = useState(PageStatusTypes.LOADING);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const getCart = async () => {
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

  const handleClearCart = async () => {
    const { _id } = cart;
    try {
      setPageStatus(PageStatusTypes.LOADING);
      await destroyOwnerCart(_id);
      setCart(null); // to force re render because destroyOwnerCart will return the deleted Cart
      setPageStatus(PageStatusTypes.OK);
    } catch (err) {
      setPageStatus(PageStatusTypes.ERROR);
      errorUtil(err);
    }
  };

  switch (pageStatus) {
    case PageStatusTypes.LOADING:
      return <Loader />;
    case PageStatusTypes.ERROR:
      return <ErrorPage />;
    default:
      break;
  }

  const cartItemsExist = cart && cart.cartItems.length > 0;

  return (
    <div>
      <main className={styles["page"]}>
        <section className={styles["section-info"]}>
          {cartItemsExist ? (
            <>
              <section>
                <h2 className={styles["title-text"]}>
                  {cart.buyer.username}'s Cart
                </h2>
                <div className={styles["descrpition-bar"]}>
                  <p className={styles["description-text"]}>
                    Last updated on {dayjs(cart.updatedAt).format("D MMM YYYY")}
                    <br />
                    <small>
                      Your cart will be emptied after 15 days from last edit.
                    </small>
                  </p>
                </div>
                <p>
                  <small>
                    Note we helped to remove deleted or disabled products (so
                    blame the Seller, not us)
                  </small>
                </p>
              </section>
            </>
          ) : (
            <>
              <h2 className={styles["title-text"]}>Your Cart is Empty</h2>
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
      {cartItemsExist && (
        <section>
          <BuyerCartTable cartItems={cart.cartItems} setCart={setCart} />

          <div className={styles["descrpition-btns"]}>
            <button onClick={handleClearCart}>Clear Cart & Regret</button>
            <button onClick={() => navigate(PATHS.PUBLIC.BUY.PRODUCT_ALL)}>
              Indulge in More Capitalism
            </button>
            <button
              onClick={() =>
                navigate(PATHS.USER(cart.buyer.username).BUYER.CHECKOUT)
              }
            >
              Ready to Give My Money
            </button>
          </div>
        </section>
      )}
      {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
    </div>
  );
};

export default BuyerCartPage;
