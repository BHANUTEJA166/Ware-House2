import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/App";
import styles from "./Header.module.css";

const Header = () => {
  const { setIsLoggedIn, setRole, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.title}>
          Warehouse Management System
        </span>
      </div>

      <div className={styles.right}>
        <span className={styles.role}>
          Role: {role}
        </span>

        <button
          className={styles.logoutBtn}
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
