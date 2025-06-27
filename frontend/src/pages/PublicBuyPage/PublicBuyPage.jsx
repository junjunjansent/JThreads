import styles from "./PublicBuyPage.module.css";
import { useEffect, useState } from "react";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../services/publicServices";

const PublicBuyPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setAllProducts(fetchedProducts);
      setDisplayProducts(fetchedProducts);
    };
    fetchAllProducts();
  }, []);

  const handleSearch = async (event) => {
    let search = event.target.value;
    const filtering = allProducts.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayProducts(filtering);
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
