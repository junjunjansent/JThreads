import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { PATHS } from "../../routes/PATHS";

import styles from "./BuyOnePage.module.css";
import InfoTextCard from "../../components/InfoTextCard";

import { getOneIndex, getVariantIndex } from "../../services/publicServices";
import { UserContext } from "../../contexts/UserContext";
import BuyOneMissingPage from "./BuyOneMissingPage";

const BuyOnePage = () => {
  const { user } = useContext(UserContext);
  const [oneProductIndex, setOneProductIndex] = useState(); // This state stores base product information that will not change (seller name, product name)
  const [displayProduct, setDisplayProduct] = useState(); // This state is for rendering product variation information
  const [variantIndex, setVariantIndex] = useState([]); // This state stores all variant information
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    const fetchOneIndex = async () => {
      const fetchedOne = await getOneIndex(productId);
      // console.log(fetchedOne);
      setOneProductIndex(fetchedOne);
    };

    const fetchVariantIndex = async () => {
      const fetchedVariants = await getVariantIndex(productId);
      // TODO refactor backend to get mainProduct data when obtaining variants - avoid double fetching
      // console.log(fetchedVariants);
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
    // console.log(displayProduct);
  };

  const {
    _id,
    productName,
    productIsActive,
    productDescription,
    productCategory,
    productDefaultDeliveryTime,
    productOwner,
  } = oneProductIndex || {};
  const { productVarAvailableQty, productVarPrice, productVarDisplayPhoto } =
    displayProduct || {};

  const renderQuantityOptions = Array.from(
    { length: productVarAvailableQty },
    (_, i) => i + 1
  );

  return (
    <>
      {oneProductIndex ? (
        <main className={styles.buyOneArea}>
          <aside className={styles["aside-img"]}>
            <img
              className={styles.productImg}
              src={productVarDisplayPhoto}
              alt={productName}
            />
          </aside>

          <section className={styles.productDetails}>
            {/* Container for Product Name and Seller */}
            <h2>{productName}</h2>
            <p>{productDescription}</p>
            <div className={styles.productHeader}>
              {/* <InfoTextCard label="Product Name" value={productName} /> */}
              <InfoTextCard label="Category" value={productCategory} />
              <InfoTextCard
                label="Ave. Delivery Time (Days)"
                value={productDefaultDeliveryTime}
              />
              <InfoTextCard
                label="Sold by"
                value={
                  <Link
                    to={PATHS.PUBLIC.USER_SHOP(productOwner?.username ?? "")}
                  >
                    {productOwner?.username ?? ""}
                  </Link>
                }
              />
            </div>

            {/* Container for Product Designs*/}
            <article>
              <h6>Designs: </h6>
              <div className={styles.designButtons}>
                {variantIndex.map((variant) => (
                  <button
                    key={variant._id}
                    id={variant._id}
                    onClick={handleSelectVariant}
                  >
                    {variant.productVarDesign}
                  </button>
                ))}
              </div>

              <div className={styles.priceQuantity}>
                <div className={styles.productPrice}>
                  Price: ${productVarPrice}
                </div>
                <div className={styles.productQuantity}>
                  Qty: {productVarAvailableQty}
                </div>
              </div>
            </article>

            <article>
              <h6>You know you want to buy it: </h6>
              <div className={styles.buttonsArea}>
                {/* <button>Quantity</button> */}
                <form>
                  <label>Quantity</label>
                  <select>
                    <optgroup>
                      {renderQuantityOptions.map((quantity) => (
                        <option key={quantity}>{quantity}</option>
                      ))}
                    </optgroup>
                  </select>
                </form>
                {user ? (
                  <button disabled={!productIsActive}>
                    {productIsActive
                      ? "Add to Cart"
                      : "User has disabled purchase"}
                  </button>
                ) : (
                  <button onClick={() => navigate(PATHS.PUBLIC.SIGN_IN)}>
                    {" "}
                    Login to Start Buying
                  </button>
                )}
              </div>
            </article>
          </section>
        </main>
      ) : (
        <BuyOneMissingPage />
      )}
    </>
  );
};

export default BuyOnePage;
