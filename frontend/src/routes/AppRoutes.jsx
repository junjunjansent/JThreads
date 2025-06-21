import { Outlet, Routes, Route } from "react-router";
import { PATHS } from "./PATHS";

import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PublicBuyPage from "../pages/PublicBuyPage/PublicBuyPage";
import AboutPage from "../pages/user/AboutPage";
import BuyAllPage from "../pages/user/buyer/BuyAllPage";
import BuyerOrdersAll from "../pages/user/buyer/BuyerOrdersAll";
import SellAllPage from "../pages/user/seller/SellAllPage";
import SellerOrdersAll from "../pages/user/seller/SellerOrdersAll";
import ErrorPage from "../components/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATHS.PUBLIC.HOME} element={<HomePage />} />
      <Route path={PATHS.PUBLIC.REGISTER} element={<RegisterPage />} />
      <Route path={PATHS.PUBLIC.LOGIN} element={<LoginPage />} />
      <Route path={PATHS.PUBLIC.BUY_ALL} element={<PublicBuyPage />} />

      <Route path="/:userId" element={<Outlet />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="buy" element={<BuyAllPage />} />
        <Route path="buy/orders" element={<BuyerOrdersAll />} />
        <Route path="sell" element={<SellAllPage />} />
        <Route path="sell/orders" element={<SellerOrdersAll />} />
      </Route>

      {/* Error Routes */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
