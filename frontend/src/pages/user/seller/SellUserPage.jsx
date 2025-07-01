// import debug from "debug";
// const log = debug("JThreads: BuyUserPage");

import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import { PATHS } from "../../../routes/PATHS";

import { BuySearchBar } from "../../../components/BuySearchBar";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { CreateProductForm } from "../../../components/CreateProductForm/CreateProductForm";
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

const SellUserPage = () => {
  const { user } = useContext(UserContext);
  const [userBasicProfile, setUserBasicProfile] = useState(null);
  const [, setPageStatus] = useState(PageStatusTypes.LOADING);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // removed 'searchParams' state as we don't need to store search params in state
  const [, setSearchParams] = useSearchParams("");
  const { userUsername } = useParams();
  // const navigate = useNavigate();

  const isOwner = isDomainForOwner(user, userUsername);
  // log("isOwner: ", isOwner);
  // log("user: ", user);
  // log("userBasicProfile", userBasicProfile);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllProducts = async () => {
      try {
        if (isOwner) {
          // to prevent unnecessary fetching, jsut get from token/UserContext
          setUserBasicProfile(user);
          // console.log(user._id);
        } else {
          const fetchedUser = await showUserBasicProfile(userUsername);
          // TODO refactor backend to get user data when obtaining oneProduct - avoid double fetching
          setUserBasicProfile(fetchedUser.user);
        }
        const { product } = await getProducts(userUsername, null);
        setAllProducts(product);
        // console.log(product);
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

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev); // Toggles the boolean value of isDialogOpen
  };

  return (
    <>
      <main className={styles.page}>
        <div className={styles["title-bar"]}>
          <h2 className={styles["title-text"]}>
            {isOwner ? `Your Products` : `${userUsername}'s Products`}
          </h2>
          <Avatar
            alt="Profile Photo"
            src={userBasicProfile?.profilePhoto ?? ""}
          />
        </div>
        <div className={styles["descrpition-bar"]}>
          <p className={styles["description-text"]}>
            Joined on {dayjs(userBasicProfile?.createdAt).format("D MMM YYYY")}
          </p>
          {isOwner && (
            <div className={styles["descrpition-btns"]}>
              <button onClick={toggleDialog}>Create New Product</button>
              <CreateProductForm
                isDialogOpen={isDialogOpen}
                toggleDialog={toggleDialog}
                userUsername={userUsername}
              />
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
            allProducts.map((product) => {
              let productLink = isOwner
                ? `/${userUsername}/sell/${product._id}`
                : `/buy/${product._id}`;
              return (
                <a
                  href={productLink}
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
                    userUsername={userUsername}
                    isOwner={isOwner}
                  />
                </a>
              );
            })
          ) : (
            <p>No products found!</p>
          )}
        </div>
      </main>
    </>
  );
};

export default SellUserPage;
