import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../../app/reducers/dashboardReducer";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { metrics, loading } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Loading dashboard...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Warehouse Management System</p>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <div className={styles.metricNumber}>{metrics.reservations || 0}</div>
          <div className={styles.metricLabel}>Total Reservations</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricNumber}>{metrics.pendingReservations || 0}</div>
          <div className={styles.metricLabel}>Pending Reservations</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricNumber}>{metrics.allocations || 0}</div>
          <div className={styles.metricLabel}>Stack Allocations</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricNumber}>{metrics.inward || 0}</div>
          <div className={styles.metricLabel}>Stock Inward</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricNumber}>{metrics.outward || 0}</div>
          <div className={styles.metricLabel}>Stock Outward</div>
        </div>
      </div>

      <div className={styles.actions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <a href="/admin/warehouses" className={`${styles.action} ${styles.actionPrimary}`}>
            Manage Warehouses
          </a>
          <a href="/reservations" className={styles.action}>View Reservations</a>
          <a href="/stack-allocations" className={styles.action}>Stack Allocations</a>
          <a href="/stock-receipt" className={styles.action}>Stock Movements</a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;











// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardMetrics } from "../../app/reducers/dashboardReducer";

// const WarehouseDashboard = () => {
//   const dispatch = useDispatch();
//   const { metrics } = useSelector(state => state.dashboard);

//   useEffect(() => {
//     dispatch(fetchDashboardMetrics());
//   }, [dispatch]);

//   return (
//     <div className="container p-4">
//       <h4>Warehouse Dashboard</h4>

//       <ul className="list-group mt-3">
//         <li className="list-group-item">Allocations: {metrics.allocations}</li>
//         <li className="list-group-item">Inward Today: {metrics.inward}</li>
//         <li className="list-group-item">Outward Today: {metrics.outward}</li>
//       </ul>
//     </div>
//   );
// };

// export default WarehouseDashboard;
