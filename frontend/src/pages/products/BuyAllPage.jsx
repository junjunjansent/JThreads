import styles from "./BuyAllPage.module.css";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../services/publicServices";

const BuyAllPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setAllProducts(fetchedProducts);
      const urlSearchParam = searchParams.get("search");
      if (urlSearchParam) {
        setSearchQuery(urlSearchParam);
      }
    };
    fetchAllProducts();
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentParams = new URLSearchParams(searchParams);
      if (searchQuery) {
        currentParams.set("search", searchQuery);
      } else {
        currentParams.delete("search");
      }
      setSearchParams(currentParams);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, setSearchParams, searchParams]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const productsToDisplay = useMemo(() => {
    const SearchQuery = searchParams.get("search");
    const lowerCaseSearchQuery = SearchQuery;
    return allProducts.filter(
      (product) =>
        product.productIsActive &&
        (product.productName.toLowerCase().includes(lowerCaseSearchQuery) ||
          product.productCategory.toLowerCase().includes(lowerCaseSearchQuery))
    );
  }, [allProducts, searchParams]);

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
