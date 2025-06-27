import { NavLink, useNavigate } from "react-router";
import { PATHS } from "../../routes/PATHS";
import { NavCategory } from "./NavCategory";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { saveTokenToLocalStorage } from "../../services/publicServices";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const { userUsername } = useParams();
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
            <NavCategory styles={styles} />
            <li>
              <NavLink to={PATHS.PUBLIC.HOME}>Home Page</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PUBLIC.BUY.ALL}>Shop</NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to={PATHS.PUBLIC.USER_SHOP(username)}>
                    My Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.USER(username).BUYER.ORDER_ALL}>
                    My Purchases
                  </NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.USER(username).SELLER.ORDER_ALL}>
                    Seller Panel
                  </NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.USER(username).SELLER.ORDER_ALL}>
                    Orders (Seller)
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
                {" "}
                <li>
                  <NavLink to={PATHS.USER(username).ABOUT.DEFAULT}>
                    Welcome, {username}!
                  </NavLink>
                </li>
                <li>
                  <a onClick={handleSignOut}>Sign Out</a>
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
