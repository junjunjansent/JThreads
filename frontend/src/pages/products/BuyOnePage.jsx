import styles from "./BuyOnePage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneIndex } from "../../services/publicServices";

const BuyOnePage = () => {
  const [oneProductIndex, setOneProductIndex] = useState();
  const productId = useParams();
  // console.log(productId);
  // need 2 API calls here, one for main product details and one for all variants
  useEffect(() => {
    const fetchOneIndex = async (productId) => {
      console.log(productId);

      const fetchedOne = await getOneIndex(productId);
      // console.log(fetchedOne);

      setOneProductIndex(fetchedOne);
    };
    fetchOneIndex();
  }, [productId]);

  return (
    <>
      <div className={styles.buyOneArea}>
        <section className={styles.productImg}>
          <p>Product Image</p>
        </section>
        <section className={styles.productDetails}>
          <div>Product Name + Product Seller</div>
          <div>
            Design Area
            <div>Design Boxes</div>
          </div>
          <div>Qty / Avail / Price Section</div>
          <div className={styles.buttonsArea}>
            <button>Quantity</button>
            <button>Add to Cart</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default BuyOnePage;
