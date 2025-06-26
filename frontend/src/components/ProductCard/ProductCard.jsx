import styles from "./ProductCard.module.css";
const ProductCard = ({ allProducts }) => {
  return (
    <>
      <div className={styles.productCard}>
        <img
          className={styles.productImage}
          src="https://homeapparel254.com/cdn/shop/collections/Daark-Brown-Tshirt-254-White.png?v=1662469719&width=2048"
        />
        <div className={styles.productName}>Teal T-shirt</div>
        <div className={styles.productSubContainer}>
          <div className={styles.productCategory}>Hats</div>
          <div className={styles.productSeller}>Seller: jt123</div>
        </div>
        <div className={styles.productSubContainer}>
          <div className={styles.productPriceRange}>S$ 15.90</div>
          <div className={styles.productQuantity}>15 avail</div>
        </div>
      </div>
    </>
  );
};

export { ProductCard };
