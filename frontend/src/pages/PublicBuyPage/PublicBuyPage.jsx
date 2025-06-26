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
          {displayProducts.map((product) => (
            <ProductCard
              key={product._id}
              name={product.productName}
              category={product.productCategory}
              photo={product.productDisplayPhoto}
              owner={product.productOwner}
              isActive={product.productIsActive}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PublicBuyPage;
