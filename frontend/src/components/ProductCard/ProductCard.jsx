import styles from "./ProductCard.module.css";
import { PATHS } from "../../routes/PATHS";
import { Button } from "@mui/material";

//TODO: need to add navigate functions to the EDIT/DELETE buttons

const ProductCard = ({
  productid,
  name,
  category,
  photo,
  owner,
  quantity,
  maxprice,
  minprice,
  isOwner = null,
  userUsername,
}) => {
  const cardRender = () => {
    switch (isOwner) {
      case true:
        return (
          <div className={styles.productCard} key={productid}>
            <img className={styles.productImage} src={photo} />
            <div className={styles.productName}>{name}</div>
            <div className={styles.productSubContainer}>
              <div className={styles.productCategory}>{category}</div>
              <div className={styles.productSeller}>{owner.username}</div>
            </div>
            <div className={styles.productSubContainer}>
              <div className={styles.productPriceRange}>
                S${minprice} - {maxprice}
              </div>
              <div className={styles.productQuantity}>{quantity} avail</div>
            </div>
            <div className={styles.sellerActionButtons}>
              <a href={PATHS.USER(userUsername).SELLER.PRODUCT_ONE(productid)}>
                <Button>Edit</Button>
              </a>
              <Button>Disable</Button>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.productCard} key={productid}>
            <img className={styles.productImage} src={photo} />
            <div className={styles.productName}>{name}</div>
            <div className={styles.productSubContainer}>
              <div className={styles.productCategory}>{category}</div>
              <div className={styles.productSeller}>{owner.username}</div>
            </div>
            <div className={styles.productSubContainer}>
              <div className={styles.productPriceRange}>
                S${minprice} - {maxprice}
              </div>
              <div className={styles.productQuantity}>{quantity} avail</div>
            </div>
          </div>
        );
    }
  };
  return <>{cardRender()}</>;
  // <div className={styles.productCard} key={productid}>
  //   <img className={styles.productImage} src={photo} />
  //   <div className={styles.productName}>{name}</div>
  //   <div className={styles.productSubContainer}>
  //     <div className={styles.productCategory}>{category}</div>
  //     <div className={styles.productSeller}>{owner.username}</div>
  //   </div>
  //   <div className={styles.productSubContainer}>
  //     <div className={styles.productPriceRange}>S$ 15.90</div>
  //     <div className={styles.productQuantity}>15 avail</div>
  //   </div>
  // </div>
};

export { ProductCard };
