import styles from "./ProductCard.module.css";

const ProductCard = ({
  productid,
  name,
  category,
  photo,
  owner,
  isOwner = null,
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
              <div className={styles.productPriceRange}>S$ 15.90</div>
              <div className={styles.productQuantity}>15 avail</div>
            </div>
            <div className={styles.sellerActionButtons}>
              <button>Edit</button>
              <button>Delete</button>
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
              <div className={styles.productPriceRange}>S$ 15.90</div>
              <div className={styles.productQuantity}>15 avail</div>
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
