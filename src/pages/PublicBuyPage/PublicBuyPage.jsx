import styles from "./PublicBuyPage.module.css";
import { BuySearchBar } from "../../components/BuySearchBar";

const PublicBuyPage = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.searchbar}>
          <BuySearchBar styles={styles} />
        </div>
      </div>
    </>
  );
};

export default PublicBuyPage;
