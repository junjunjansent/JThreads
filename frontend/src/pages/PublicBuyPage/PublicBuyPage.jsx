import styles from "./PublicBuyPage.module.css";
import { useEffect, useState } from "react";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../services/displayProducts";

const PublicBuyPage = () => {
  const [displayProducts, setDisplayProducts] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getAllProducts();
      setDisplayProducts(allProducts);
      console.log(allProducts);
    };
    fetchAllProducts();
  }, []);
  return (
    <>
      <div className={styles.page}>
        <div className={styles.searchbar}>
          <BuySearchBar styles={styles} />
        </div>
        <div className={styles.searcharea}>
          <ProductCard allProducts={displayProducts} />
        </div>
      </div>
    </>
  );
};

export default PublicBuyPage;
