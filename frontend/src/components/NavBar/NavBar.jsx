import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { PATHS } from "../../routes/PATHS";
import { NavCategory } from "./NavCategory";
import { UserContext } from "../../contexts/UserContext";
import { saveTokenToLocalStorage } from "../../services/publicServices";

import styles from "./NavBar.module.css";
import logoImg from "../../assets/JThreads_logo.png";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCartShopping,
  faDoorOpen,
  faShopLock,
  faStore,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const username = user ? user.username : undefined;

  const handleSignOut = () => {
    saveTokenToLocalStorage(null);
    setUser(null);
    navigate(PATHS.PUBLIC.HOME);
  };

  return (
    <div className={styles.navbar}>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to={PATHS.PUBLIC.HOME}>
                <Avatar alt="Profile Photo" src={logoImg} variant="square" />
              </NavLink>
            </li>
            <NavCategory styles={styles} />
            {/* Is it possible to make NavCategory a drop down from "Shop" instead */}
            <li>
              <NavLink to={PATHS.PUBLIC.BUY.ALL}>Shop</NavLink>
              <FontAwesomeIcon icon={faStore} />
            </li>

            {user && (
              <>
                <li>
                  <NavLink to={PATHS.PUBLIC.USER_SHOP(username)}>
                    My Page
                    <FontAwesomeIcon icon={faShopLock} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.USER(username).BUYER.ORDER_ALL}>
                    My Purchases
                    <FontAwesomeIcon icon={faBagShopping} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.USER(username).SELLER.ORDER_ALL}>
                    Orders (Seller)
                    <FontAwesomeIcon icon={faTruck} />
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          <ul>
            {user ? (
              <>
                <li>
                  <NavLink to={PATHS.USER(username).ABOUT.DEFAULT}>
                    Welcome, {username}!
                    <FontAwesomeIcon icon={faUser} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.USER(username).BUYER.CART}>
                    My Cart
                    <FontAwesomeIcon icon={faCartShopping} />
                  </NavLink>
                </li>
                <li>
                  <a onClick={handleSignOut}>
                    Sign Out <FontAwesomeIcon icon={faDoorOpen} />
                  </a>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink to={PATHS.PUBLIC.SIGN_IN}>Sign In</NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.PUBLIC.SIGN_UP}>Sign Up</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
