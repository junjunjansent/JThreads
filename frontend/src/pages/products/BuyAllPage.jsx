import styles from "./BuyMultiPage.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { BuySearchBar } from "../../components/BuySearchBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/publicServices";

const BuyAllPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const urlSearchParam = searchParams.get("search");

      if (urlSearchParam) {
        setSearchQuery(urlSearchParam);
      }
      try {
        const { product } = await getProducts(null, urlSearchParam || "");
        setAllProducts(product);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setAllProducts([]);
      }
    };

    fetchAndSetProducts();
  }, [searchParams]);

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    if (newSearchQuery) {
      setSearchParams({ search: newSearchQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <main className={styles.page}>
        <div className={styles["title-bar"]}>
          <h2 className={styles["title-text"]}>All Products</h2>
        </div>
        <p className={styles["description-text"]}>
          Shop to Your Heart's Content
        </p>

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
                  quantity={product.availableQuantity}
                  maxprice={product.variantMaxPrice}
                  minprice={product.variantMinPrice}
                />
              </a>
            ))
          ) : (
            <p>No products found!</p>
          )}
        </div>
      </main>
    </>
  );
};

export default BuyAllPage;
