import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStockIssues } from "../../services/stockService";
import styles from "./IssueDetails.module.css"; // CSS Module

const IssueDetails = () => {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIssueDetails();
  }, [tokenId]);

  const fetchIssueDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const issues = await getStockIssues();
      
      const issuedRecord = issues.find(
        (item) => String(item.tokenId) === String(tokenId)
      );
      
      if (issuedRecord) {
        setIssue(issuedRecord);
      } else {
        setError(`No issue record found for token ${tokenId}`);
      }
    } catch (err) {
      setError("Failed to load issue details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingCenter}>
          <div className={styles.spinner}></div>
          <h5>Loading issue details...</h5>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <i className={`${styles.errorIcon} bi bi-exclamation-triangle-fill`}></i>
          <h4>Issue Record Not Found</h4>
          <p>No stock issue found for token <strong>{tokenId}</strong></p>
          <button 
            className={styles.backBtn}
            onClick={() => navigate("/stock-issue/tokens")}
          >
            ← Back to Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * { visibility: hidden; }
          .${styles.printSection}, .${styles.printSection} * { 
            visibility: visible; 
          }
          .${styles.printSection} { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            max-width: 600px;
            font-family: Arial, sans-serif;
          }
          .no-print { display: none !important; }
          @page { margin: 1in; }
        }
      `}</style>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>
              <i className="bi bi-box-arrow-down"></i>
              Stock Issue Details
            </h2>
            <p>Issue ID: <strong>{issue.id}</strong></p>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={`${styles.btn} ${styles.btnSuccess}`}
              onClick={() => window.print()}
            >
              <i className="bi bi-printer"></i> Print
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => navigate("/stock-issue/tokens")}
            >
              <i className="bi bi-arrow-left"></i> Back
            </button>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* Main Issue Info */}
          <div className={styles.mainCard}>
            <div className={styles.cardHeader}>
              <h5>Issue Information</h5>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Issue ID</label>
                  <div className={styles.value}>{issue.id}</div>
                </div>
                <div className={styles.infoItem}>
                  <label>Token ID</label>
                  <div className={styles.valueSecondary}>{issue.tokenId}</div>
                </div>
                <div className={styles.infoItem}>
                  <label>Issued Quantity</label>
                  <div className={styles.quantityBadge}>
                    {issue.issuedQuantity} {issue.unit || "Quintal"}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <label>Status</label>
                  <span className={styles.statusBadge}>ISSUED</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Vehicle Number</label>
                  <div className={styles.value}>{issue.vehicleNumber}</div>
                </div>
                <div className={styles.infoItem}>
                  <label>Driver</label>
                  <div className={styles.valueSecondary}>{issue.driverName}</div>
                </div>
                <div className={styles.infoItemFull}>
                  <label>Issue Date</label>
                  <div className={styles.dateValue}>{formatDate(issue.issueDate)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className={styles.actionsCard}>
            <div className={styles.cardHeader}>
              <h6>Actions</h6>
            </div>
            <div className={styles.actionList}>
              <a 
                href={`data:text/plain;charset=utf-8,Stock%20Issue%20${issue.id}%0AToken%3A%20${issue.tokenId}%0AQuantity%3A%20${issue.issuedQuantity}%20${issue.unit}%0AVehicle%3A%20${issue.vehicleNumber}%0ADriver%3A%20${issue.driverName}%0ADate%3A%20${issue.issueDate}`}
                className={styles.actionItem}
                download={`issue-${issue.id}.txt`}
              >
                <i className="bi bi-download"></i>
                <span>Download Record</span>
              </a>
            </div>
          </div>
        </div>

        {/* PRINT SECTION - Only this prints */}
        <div className={`${styles.printSection} no-print`}>
          <div className={styles.printHeader}>
            <h2>STOCK ISSUE GATE PASS</h2>
            <h4>Medak Central Warehouse</h4>
            <p>Date: {formatDate(issue.issueDate)}</p>
          </div>
          
          <div className={styles.printContent}>
            <div className={styles.printRow}>
              <span className={styles.printLabel}>Issue ID:</span>
              <span>{issue.id}</span>
            </div>
            <div className={styles.printRow}>
              <span className={styles.printLabel}>Token ID:</span>
              <span>{issue.tokenId}</span>
            </div>
            <div className={styles.printRow}>
              <span className={styles.printLabel}>Quantity:</span>
              <span>{issue.issuedQuantity} {issue.unit || "Quintal"}</span>
            </div>
            <div className={styles.printRow}>
              <span className={styles.printLabel}>Vehicle:</span>
              <span>{issue.vehicleNumber}</span>
            </div>
            <div className={styles.printRow}>
              <span className={styles.printLabel}>Driver:</span>
              <span>{issue.driverName}</span>
            </div>
            <div className={styles.printRow}>
              <span className={styles.printLabel}>Status:</span>
              <span>ISSUED</span>
            </div>
          </div>
          
          <div className={styles.printSignature}>
            <div>
              <p>Warehouse Supervisor</p>
              <p>_______________________</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueDetails;










// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getStockIssues } from "../../services/stockService";

// const IssueDetails = () => {
//   const { tokenId } = useParams();
//   const [issue, setIssue] = useState(null);

//   useEffect(() => {
//     fetchIssueDetails();
//   }, [tokenId]);

//   const fetchIssueDetails = async () => {
//     const data = await getStockIssues();

//     // Find issue related to this token
//     const issuedRecord = data.find(
//       (item) => item.tokenId === tokenId
//     );

//     setIssue(issuedRecord);
//   };

//   if (!issue) {
//     return (
//       <div className="container p-4">
//         <h5>No issue details found for this token.</h5>
//       </div>
//     );
//   }

//   return (
//     <div className="container p-4">
//       <h4 className="mb-4">Stock Issue Details</h4>

//       <table className="table table-bordered w-50">
//         <tbody>
//           <tr>
//             <th>Issue ID</th>
//             <td>{issue.id}</td>
//           </tr>
//           <tr>
//             <th>Token ID</th>
//             <td>{issue.tokenId}</td>
//           </tr>
//           <tr>
//             <th>Issued Quantity</th>
//             <td>{issue.issuedQuantity}</td>
//           </tr>
//           <tr>
//             <th>Vehicle Number</th>
//             <td>{issue.vehicleNumber}</td>
//           </tr>
//           <tr>
//             <th>Driver Name</th>
//             <td>{issue.driverName}</td>
//           </tr>
//           <tr>
//             <th>Issue Date</th>
//             <td>{issue.issueDate}</td>
//           </tr>
//           <tr>
//             <th>Status</th>
//             <td>
//               <span className="badge bg-success">
//                 {issue.status}
//               </span>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default IssueDetails;
