import styles from "./BuyOnePage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneIndex } from "../../services/publicServices";

const BuyOnePage = () => {
  const [oneProductIndex, setOneProductIndex] = useState();
  const { productId } = useParams();
  // need 2 API calls here, one for main product details and one for all variants
  useEffect(() => {
    const fetchOneIndex = async () => {
      const fetchedOne = await getOneIndex(productId);
      console.log(fetchedOne);
      setOneProductIndex(fetchedOne);
    };
    fetchOneIndex();
  }, [productId]);

  const { productDisplayPhoto, productName } = oneProductIndex || {};
  const { username } = oneProductIndex?.productOwner || {};

  return (
    <>
      <div className={styles.buyOneArea}>
        <section className={styles.productImg}>
          <img src={productDisplayPhoto} alt={productName} />
        </section>
        <section className={styles.productDetails}>
          {/* Container for Product Name and Seller */}
          <div className={styles.productHeader}>
            <div>{productName}</div>
            <div>{username}</div>
          </div>

          {/* Container for Product Designs*/}
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
