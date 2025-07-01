import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { PATHS } from "../../../routes/PATHS";

import styles from "./SellOnePage.module.css";
import InfoTextCard from "../../../components/InfoTextCard";

import { getOneIndex, getVariantIndex } from "../../../services/publicServices";
import { editProduct } from "../../../services/productServices";
import { CreateVariantForm } from "../../../components/CreateVariantForm";
import { UserContext } from "../../../contexts/UserContext";
import BuyOneMissingPage from "../../products/BuyOneMissingPage";
import { EditVariantForm } from "../../../components/EditVariantForm";

const SellOnePage = () => {
  // const { user } = useContext(UserContext);
  const [oneProductIndex, setOneProductIndex] = useState(); // This state stores base product information that will not change (seller name, product name)
  const [displayProduct, setDisplayProduct] = useState(); // This state is for rendering product variation information
  const [variantIndex, setVariantIndex] = useState([]); // This state stores all variant information
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVariantId, setEditingVariantId] = useState(null); // This state is for passing the variant Id to the edit variant form
  const [editingVariantDetails, setEditingVariantDetails] = useState(null); // This state will store the full variant object being edited
  const [editProductDetails, setEditProductDetails] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productDisplayPhoto: "",
    productDefaultDeliveryTime: "",
    // productOwner: user._id,
  });
  // const navigate = useNavigate();
  const { productId } = useParams();

  // States for editing functions
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchOneIndex = async () => {
      const fetchedOne = await getOneIndex(productId);
      // console.log(fetchedOne);
      setOneProductIndex(fetchedOne);
      setEditProductDetails(fetchedOne);
    };

    const fetchVariantIndex = async () => {
      const fetchedVariants = await getVariantIndex(productId);
      // TODO refactor backend to get mainProduct data when obtaining variants - avoid double fetching
      console.log(fetchedVariants);
      setVariantIndex(fetchedVariants);
      setDisplayProduct(fetchedVariants[0]); // Set the first variant as the default selected variant information to render
    };

    fetchOneIndex();
    fetchVariantIndex();
  }, [productId]);

  const {
    _id,
    productName,
    // productIsActive,
    productDescription,
    productCategory,
    productDefaultDeliveryTime,
    productOwner,
  } = oneProductIndex || {};
  const { productVarAvailableQty, productVarPrice, productVarDisplayPhoto } =
    displayProduct || {};

  // editing functions go here
  const handleEditProduct = () => {
    setIsEditing((prev) => !prev); // Toggles the boolean value of isDialogOpen
  };

  const handleSubmitProductEdit = (event) => {
    const { name, value } = event.target;
    setEditProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    editProduct(editProductDetails, productId);
    setOneProductIndex(editProductDetails);
  };

  const editFieldRender = () => {
    switch (isEditing) {
      case true:
        return (
          <>
            <button onClick={handleEditProduct}>Save Changes</button>
            <div onChange={handleSubmitProductEdit}>
              <label>
                Product Name
                <input
                  name="productName"
                  field="text"
                  placeholder={productName}
                ></input>
              </label>

              <label>
                Product Description
                <input
                  name="productDescription"
                  field="text"
                  placeholder={productDescription}
                ></input>
              </label>

              <div className={styles.productHeader}>
                {/* <InfoTextCard label="Product Name" value={productName} /> */}
                {/* <InfoTextCard label="Category" value={productCategory} /> */}
                <label>
                  Product Category
                  <select name="productCategory" value={productCategory}>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Headwear">Headwear</option>
                    <option value="Bags">Bags</option>
                    <option value="Accesories">Accessories</option>
                    <option value="Misc">Misc</option>
                  </select>
                </label>
                <label>{`Ave. Delivery Time (Days)`}</label>
                <input
                  name="AbveproductDefaultDeliveryTime"
                  placeholder={productDefaultDeliveryTime}
                ></input>
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
            </div>
          </>
        );
      case false:
        return (
          <>
            <button onClick={handleEditProduct}>Edit Product Details</button>
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
          </>
        );
    }
  };

  const toggleDialog = (variantId = null) => {
    setIsDialogOpen((prev) => !prev); // Toggles the boolean value of isDialogOpen

    // these portion is to filter out variant related information when editing variants which we will pass to the edit variant form
    setEditingVariantId(variantId);
    const variantToEdit = variantIndex.find(
      (variant) => variant._id === variantId
    );
    setEditingVariantDetails(variantToEdit);
  };

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
            {editFieldRender()}
            {/* Container for Product Designs*/}
            <article>
              <h6>Designs: </h6>
              <div className={styles.designButtons}>
                <button onClick={toggleDialog}>Add Design</button>
                <CreateVariantForm
                  isDialogOpen={isDialogOpen}
                  toggleDialog={toggleDialog}
                  productId={productId}
                />
                {variantIndex.map((variant) => (
                  <>
                    <button
                      key={variant._id}
                      id={variant._id}
                      onClick={() => toggleDialog(variant._id)}
                    >
                      {variant.productVarDesign}
                    </button>
                    <EditVariantForm
                      isDialogOpen={isDialogOpen}
                      toggleDialog={() => toggleDialog(null)}
                      productId={productId}
                      variantId={editingVariantId}
                      variantData={editingVariantDetails}
                    />
                  </>
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
          </section>
        </main>
      ) : (
        <BuyOneMissingPage />
      )}
    </>
  );
};

export default SellOnePage;
