// import debug from "debug";
// const log = debug("JThreads: BuyUserPage");

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import { PATHS } from "../../../routes/PATHS";

import { BuySearchBar } from "../../../components/BuySearchBar";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import Loader from "../../../components/Loader";
import ErrorPage from "../../ErrorPage";

import {
  getProducts,
  showUserBasicProfile,
} from "../../../services/publicServices";

import { isDomainForOwner } from "../../../utils/ownerValidator";
import { errorUtil } from "../../../utils/errorUtil";
import { PageStatusTypes } from "../../../utils/pageStatusUtil";

import styles from "./SellMultiPage.module.css";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";

const SellAllPage = () => {
  // TODO: Should this be SellUserPage for consistency with BuyUserPage?
  const { user } = useContext(UserContext);
  const [userBasicProfile, setUserBasicProfile] = useState(null);
  const [pageStatus, setPageStatus] = useState(PageStatusTypes.LOADING);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // removed 'searchParams' state as we don't need to store search params in state
  const [, setSearchParams] = useSearchParams("");
  const { userUsername } = useParams();
  const navigate = useNavigate();

  const isOwner = isDomainForOwner(user, userUsername); // boolean to check if the user is viewing their own profile
  // log("isOwner: ", isOwner);
  // log("user: ", user);
  // log("userBasicProfile", userBasicProfile);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const controller = new AbortController();
      try {
        if (isOwner) {
          // to prevent unnecessary fetching, jsut get from token/UserContext
          setUserBasicProfile(user);
        } else {
          const fetchedUser = await showUserBasicProfile(userUsername);
          setUserBasicProfile(fetchedUser.user);
        }
        const { product } = await getProducts(userUsername, null);
        setAllProducts(product);
        setPageStatus(PageStatusTypes.OK);
      } catch (err) {
        setPageStatus(PageStatusTypes.ERROR);
        errorUtil(err);
      }

      return () => {
        // Cleanup on unmount
        controller.abort();
      };
    };
    fetchAllProducts();
  }, [userUsername, user, isOwner]);

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    setSearchParams(`search=${newSearchQuery}`);
    const fetchAllProducts = async () => {
      const { product } = await getProducts(userUsername, newSearchQuery);
      setAllProducts(product);
    };
    fetchAllProducts();
  };

  switch (pageStatus) {
    case PageStatusTypes.LOADING:
      return <Loader />;
    case PageStatusTypes.ERROR:
      return <ErrorPage />;
    default:
      break;
  }

  return (
    <>
      <main className={styles.page}>
        <div className={styles["title-bar"]}>
          <h2 className={styles["title-text"]}>
            {isOwner ? `Your Products` : `${userUsername}'s Products`}
          </h2>
          <Avatar
            alt="Profile Photo"
            src={userBasicProfile.profilePhoto ?? ""}
          />
        </div>
        <div className={styles["descrpition-bar"]}>
          <p className={styles["description-text"]}>
            Joined on {dayjs(userBasicProfile.createdAt).format("D MMM YYYY")}
          </p>
          {isOwner && (
            <div className={styles["descrpition-btns"]}>
              <button
                onClick={() =>
                  navigate(PATHS.USER(userUsername).SELLER.PRODUCT_ONE)
                }
              >
                Create New Listing
              </button>
              {/* <button
                onClick={() => navigate(PATHS.USER(userUsername).ABOUT.DEFAULT)}
              >
                My Profile Details
              </button> */}
            </div>
          )}
        </div>

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
                  isOwner={isOwner}
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

export default SellAllPage;
