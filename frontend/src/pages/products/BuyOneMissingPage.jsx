import { useNavigate } from "react-router";
import { PATHS } from "../../routes/PATHS";

import styles from "./BuyOnePage.module.css";
import logoImg from "../..//assets/JThreads_logo.png";

const BuyOneMissingPage = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.buyOneArea}>
      <aside className={styles["aside-img"]}>
        <img className={styles.productImg} src={logoImg} alt="Logo" />
      </aside>

      <section className={styles.productDetails}>
        {/* Container for Product Name and Seller */}
        <h2>Cannot Find This Product</h2>
        <p>
          The Product you are looking for not here. Want to buy something else?
        </p>
        <button onClick={() => navigate(PATHS.PUBLIC.BUY.PRODUCT_ALL)}>
          To Capitalism
        </button>
      </section>
    </main>
  );
};

export default BuyOneMissingPage;
