import { useEffect, useState } from "react";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";
import Loader from "../../../components/Loader";
import ErrorPage from "../../ErrorPage";

import { showOwnerCart } from "../../../services/cartServices";
import { errorUtil } from "../../../utils/errorUtil";

const BuyCartPage = () => {
  const [cart, setCart] = useState(null);
  const [pageStatus, setPageStatus] = useState(PageStatusTypes.LOADING);

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
    <>
      <h1>BuyCartPage</h1>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </>
  );
};

export default BuyCartPage;
