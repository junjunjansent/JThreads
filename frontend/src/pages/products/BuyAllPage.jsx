import styles from "./BuyAllPage.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../services/publicServices";

const BuyAllPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setAllProducts(fetchedProducts);
    };
    fetchAllProducts();
  }, []);

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    setSearchParams(`search=${newSearchQuery}`);
    const fetchAllProducts = async () => {
      const fetchedProducts = await getAllProducts(newSearchQuery);
      setAllProducts(fetchedProducts);
    };
    fetchAllProducts();
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.searchbar}>
          <BuySearchBar
            styles={styles}
            handleInputChange={handleInputChange}
            searchvalue={searchQuery}
          />
        </div>
        <div className={styles.searcharea}>
          {allProducts.map((product) => (
            <a
              href={`/buy/${product._id}`}
              className={styles.productlink}
              key={product._id}
            >
              <ProductCard
                productid={product._id}
                name={product.productName}
                category={product.productCategory}
                photo={product.productDisplayPhoto}
                owner={product.productOwner}
                isActive={product.productIsActive} // TODO: isActive is passed here but not used yet. We probably need to put this into the JS portion as a filter to not render !isActive products
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyAllPage;
