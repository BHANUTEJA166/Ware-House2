import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../app/App";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { role } = useContext(AuthContext);

  return (
    <aside className={styles.sidebar}>

      <NavLink to="/warehouse/dashboard" className={styles.link}>
        Dashboard
      </NavLink>

      {(role === "ADMIN" || role === "MANAGER") && (
        <>
          <NavLink to="/reservations" className={styles.link}>
            Space Reservations
          </NavLink>

          <NavLink to="/stack-allocations" className={styles.link}>
            Stack Allocation
          </NavLink>

          <NavLink to="/stock-receipt" className={styles.link}>
            Stock Receipt
          </NavLink>

          <NavLink to="/stock-issue" className={styles.link}>
            Stock Issue
          </NavLink>
        </>
      )}

      {role === "INSPECTOR" && (
        <>
          <NavLink to="/inspections" className={styles.link}>
            Inspections
          </NavLink>

          <NavLink to="/physical-verification" className={styles.link}>
            Physical Verification
          </NavLink>
        </>
      )}

      {role === "ADMIN" && (
        <>
          <NavLink to="/admin/warehouses" className={styles.link}>
            Warehouse Configuration
          </NavLink>

          <NavLink to="/reports" className={styles.link}>
            Reports
          </NavLink>
        </>
      )}

    </aside>
  );
};

export default Sidebar;
