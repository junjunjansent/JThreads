import styles from "./PublicBuyPage.module.css";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";

const PublicBuyPage = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.searchbar}>
          <BuySearchBar styles={styles} />
        </div>
        <div className={styles.searcharea}>
          <ProductCard />
        </div>
      </div>
    </>
  );
};

export default PublicBuyPage;
