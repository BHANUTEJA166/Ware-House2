import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          The page you are looking for does not exist or has been moved.
        </p>

        <div className={styles.actions}>
          <button 
            className={styles.btnPrimary}
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
          <button 
            className={styles.btnSecondary}
            onClick={() => navigate("/admin/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>

        <div className={styles.footer}>
          <p>If you believe this is an error, please contact the system administrator.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
