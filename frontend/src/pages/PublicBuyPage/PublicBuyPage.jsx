import styles from "./PublicBuyPage.module.css";
import { useEffect, useState } from "react";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../services/publicServices";

const PublicBuyPage = () => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [searchentry, setSearchEntry] = useState();
  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getAllProducts();
      setDisplayProducts(allProducts);
      console.log(allProducts);
    };
    fetchAllProducts();
  }, []);

  const handleSearch = async (event) => {
    let search = event.target.value;
    setSearchEntry(search);
    console.log(searchentry);
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.searchbar}>
          <BuySearchBar styles={styles} handleSearch={handleSearch} />
        </div>
        <div className={styles.searcharea}>
          {displayProducts.map((product) => (
            <ProductCard
              productid={product._id}
              name={product.productName}
              category={product.productCategory}
              photo={product.productDisplayPhoto}
              owner={product.productOwner}
              isActive={product.productIsActive} // TODO: isActive is passed here but not used yet. We probably need to put this into the JS portion as a filter to not render !isActive products
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PublicBuyPage;
