import styles from "./BuyUserPage.module.css";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getUserProducts } from "../../services/publicServices";

const BuyUserPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // removed 'searchParams' state as we don't need to store search params in state
  const [, setSearchParams] = useSearchParams("");
  const { userUsername } = useParams();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const fetchedProducts = await getUserProducts(userUsername);
      setAllProducts(fetchedProducts);
    };
    fetchAllProducts();
  }, [userUsername]);

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    setSearchParams(`search=${newSearchQuery}`);
    const fetchAllProducts = async () => {
      const fetchedProducts = await getUserProducts(
        userUsername,
        newSearchQuery
      );
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
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
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
                />
              </a>
            ))
          ) : (
            <p>No products found!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyUserPage;
