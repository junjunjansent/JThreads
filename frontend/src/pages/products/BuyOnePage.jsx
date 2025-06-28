import styles from "./BuyOnePage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneIndex, getVariantIndex } from "../../services/publicServices";

const BuyOnePage = () => {
  const [oneProductIndex, setOneProductIndex] = useState(); // This state stores base product information that will not change (seller name, product name)
  const [displayProduct, setDisplayProduct] = useState(); // This state is for rendering product variation information
  const [variantIndex, setVariantIndex] = useState([]); // This state stores all variant information
  const { productId } = useParams();

  useEffect(() => {
    const fetchOneIndex = async () => {
      const fetchedOne = await getOneIndex(productId);
      // console.log(fetchedOne);
      setOneProductIndex(fetchedOne);
    };
    const fetchVariantIndex = async () => {
      const fetchedVariants = await getVariantIndex(productId);
      console.log(fetchedVariants);
      setVariantIndex(fetchedVariants);
      setDisplayProduct(fetchedVariants[0]); // Set the first variant as the default selected variant information to render
    };
    fetchOneIndex();
    fetchVariantIndex();
  }, [productId]);

  const handleSelectVariant = (event) => {
    const selectedVariantId = event.target.id;
    const index = variantIndex.findIndex(
      (variant) => variant._id === selectedVariantId
    );
    setDisplayProduct(variantIndex[index]);
    console.log(displayProduct);
  };

  const { _id, productDisplayPhoto, productName } = oneProductIndex || {};
  const { username } = oneProductIndex?.productOwner || {};
  const { productVarAvailableQty, productVarPrice } = displayProduct || {};

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
            <div className={styles.designButtons}>
              {variantIndex.map((variant) => (
                <button id={variant._id} onClick={handleSelectVariant}>
                  {variant.productVarDesign}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.priceQuantity}>
            <div className={styles.productPrice}>Price: {productVarPrice}</div>
            <div className={styles.productQuantity}>
              Qty: {productVarAvailableQty}
            </div>
          </div>
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
