import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Outlet, Routes, Route, useParams } from "react-router";
import { PATHS, relativeUserPaths } from "./PATHS";

import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import PublicBuyPage from "../pages/PublicBuyPage/PublicBuyPage";
import BuyOnePage from "../pages/PublicBuyPage/BuyOnePage";
import AboutPage from "../pages/user/AboutPage";
import AboutEditProfilePage from "../pages/user/AboutEditProfilePage";
import AboutEditPasswordPage from "../pages/user/AboutEditPasswordPage";
import BuyAllPage from "../pages/PublicBuyPage/BuyAllPage";
import BuyerOrdersAll from "../pages/user/buyer/BuyerOrdersAll";
import BuyerCartPage from "../pages/user/buyer/BuyerCartPage";
import SellAllPage from "../pages/user/seller/SellAllPage";
import SellOnePage from "../pages/user/seller/SellOnePage";
import SellerOrdersAll from "../pages/user/seller/SellerOrdersAll";
import ErrorPage from "../pages/ErrorPage";
import UnauthPage from "../pages/UnauthPage";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  const { userUsername } = useParams();
  if (user) {
    const { username } = user;
    return username === userUsername ? <Outlet /> : <UnauthPage />;
  } else {
    return <UnauthPage />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.PUBLIC.HOME} element={<HomePage />} />
      <Route path={PATHS.PUBLIC.SIGN_UP} element={<SignUpPage />} />
      <Route path={PATHS.PUBLIC.SIGN_IN} element={<SignInPage />} />
      <Route path={PATHS.PUBLIC.BUY.ALL} element={<PublicBuyPage />} />
      <Route path={PATHS.PUBLIC.BUY.PRODUCT_ONE()} element={<BuyOnePage />} />
      <Route path={PATHS.PUBLIC.USER_SHOP()} element={<PublicBuyPage />} />

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
