import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Outlet, Routes, Route, useParams } from "react-router";
import { PATHS, relativeUserPaths } from "./PATHS";

import HomePage from "../pages/general/HomePage";
import SignUpPage from "../pages/general/SignUpPage";
import SignInPage from "../pages/general/SignInPage";
import BuyAllPage from "../pages/products/BuyAllPage";
import BuyOnePage from "../pages/products/BuyOnePage";
import BuyUserPage from "../pages/products/BuyUserPage";
import AboutPage from "../pages/user/about/AboutPage";
import AboutEditProfilePage from "../pages/user/about/AboutEditProfilePage";
import AboutEditPasswordPage from "../pages/user/about/AboutEditPasswordPage";
import BuyerOrdersAll from "../pages/user/buyer/BuyerOrdersAll";
import BuyerCartPage from "../pages/user/buyer/BuyerCartPage";
import SellAllPage from "../pages/user/seller/SellAllPage";
import SellOnePage from "../pages/user/seller/SellOnePage";
import SellerOrdersAll from "../pages/user/seller/SellerOrdersAll";
import ErrorPage from "../pages/ErrorPage";
import UnauthPage from "../pages/general/UnauthPage";
import { isDomainForOwner } from "../utils/ownerValidator";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  const { userUsername } = useParams();
  return isDomainForOwner(user, userUsername) ? <Outlet /> : <UnauthPage />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.PUBLIC.HOME} element={<HomePage />} />
      <Route path={PATHS.PUBLIC.SIGN_UP} element={<SignUpPage />} />
      <Route path={PATHS.PUBLIC.SIGN_IN} element={<SignInPage />} />
      <Route path={PATHS.PUBLIC.BUY.ALL} element={<BuyAllPage />} />
      <Route path={PATHS.PUBLIC.BUY.PRODUCT_ONE()} element={<BuyOnePage />} />
      <Route path={PATHS.PUBLIC.USER_SHOP()} element={<BuyUserPage />} />

      <Route path={`/:userUsername`} element={<PrivateRoute />}>
        <Route path={PATHS.USER().ABOUT.DEFAULT} element={<AboutPage />} />
        <Route
          path={relativeUserPaths.ABOUT.EDIT_PROFILE}
          element={<AboutEditProfilePage />}
        />
        <Route
          path={relativeUserPaths.ABOUT.EDIT_PASSWORD}
          element={<AboutEditPasswordPage />}
        />
        <Route
          path={relativeUserPaths.BUYER.CART}
          element={<BuyerCartPage />}
        />
        <Route
          path={relativeUserPaths.BUYER.ORDER_ALL}
          element={<BuyerOrdersAll />}
        />
        {/* <Route
          path={relativeUserPaths.BUYER.ORDER_ONE()}
          element={<Undefined />}
        />   */}
        <Route
          path={relativeUserPaths.SELLER.PRODUCT_ALL}
          element={<SellAllPage />}
        />
        <Route
          path={relativeUserPaths.SELLER.PRODUCT_ONE()}
          element={<SellOnePage />}
        />
        <Route
          path={relativeUserPaths.SELLER.ORDER_ALL}
          element={<SellerOrdersAll />}
        />
        {/* <Route
          path={relativeUserPaths.SELLER.ORDER_ONE()}
          element={<Undefined />}
        /> */}
      </Route>

      {/* Error Routes */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
