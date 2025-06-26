import styles from "./ProductCard.module.css";

const ProductCard = ({ key, name, category, photo, owner, isActive }) => {
  return (
    <div className={styles.productCard}>
      <img className={styles.productImage} src={photo} />
      <div className={styles.productName}>{name}</div>
      <div className={styles.productSubContainer}>
        <div className={styles.productCategory}>{category}</div>
        <div className={styles.productSeller}>Seller: {owner}</div>
      </div>
      <div className={styles.productSubContainer}>
        <div className={styles.productPriceRange}>S$ 15.90</div>
        <div className={styles.productQuantity}>15 avail</div>
      </div>
    </div>
  );
};

export { ProductCard };
