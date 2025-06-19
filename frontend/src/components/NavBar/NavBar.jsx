import { NavLink } from "react-router";
import { PATHS } from "../../routes/PATHS";
import { NavCategory } from "./NavCategory";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <nav>
        <ul>
          <NavCategory styles={styles} />
          <li>
            <NavLink to={PATHS.PUBLIC.HOME}>Home Page</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.PUBLIC.REGISTER}>Register</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.PUBLIC.LOGIN}>Login</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.PUBLIC.BUY_ALL}>Shop</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.USER(1).ABOUT}>About</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.USER(1).BUYER.BUY_ALL}>Shop (Buyer)</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.USER(1).BUYER.ORDER_ALL}>Orders (Buyer)</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.USER(1).SELLER.SELL_ALL}>Seller Panel</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.USER(1).SELLER.ORDER_ALL}>
              Orders (Seller)
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
