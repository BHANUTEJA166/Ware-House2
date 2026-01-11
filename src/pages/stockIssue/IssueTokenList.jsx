import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStockIssueTokens } from "../../services/stockService";

const IssueTokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      const data = await getStockIssueTokens();
      console.log("📤 ISSUE TOKENS LOADED:", data);
      setTokens(data || []);
    } catch (error) {
      console.error("Error loading issue tokens:", error);
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "bg-warning text-dark";
      case "APPROVED": return "bg-info";
      case "ISSUED": return "bg-success";
      case "COMPLETED": return "bg-primary";
      default: return "bg-secondary";
    }
  };

  const handleRefresh = () => {
    fetchTokens();
  };

  if (loading) {
    return (
      <div className="container p-4">
        <div className="text-center p-5">
          <div className="spinner-border text-danger" role="status" style={{width: '4rem', height: '4rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 h5">Loading stock issue requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-box-arrow-down text-danger me-2"></i>
            Stock Issue Requests
          </h2>
          <p className="text-muted mb-0">
            Manage outward stock movements
          </p>
        </div>
        <div className="d-flex gap-2">
          <span className="badge bg-dark fs-6">{tokens.length} Requests</span>
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={handleRefresh}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {tokens.length === 0 ? (
        <div className="alert alert-info d-flex align-items-center">
          <i className="bi bi-info-circle-fill fs-3 me-3"></i>
          <div>
            <h5>No issue requests found</h5>
            <p className="mb-0">
              Issue requests are generated after allocation approval.
              <br />
              Check <Link to="/stack-allocations" className="text-decoration-none">Stack Allocations</Link> 
              or <Link to="/stock-receipt" className="text-decoration-none">Stock Receipts</Link>.
            </p>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th style={{width: '120px'}}>Token ID</th>
                <th>Commodity</th>
                <th style={{width: '150px'}}>Quantity</th>
                <th>Warehouse</th>
                <th style={{width: '120px'}}>Status</th>
                <th style={{width: '180px'}}>Action</th>
              </tr>
            </thead>

            <tbody>
              {tokens.map((item) => (
                <tr key={item.id} className="align-middle">
                  <td>
                    <strong className="text-danger">{item.id}</strong>
                  </td>
                  <td>
                    <div>
                      <strong className="d-block">{item.commodity || 'N/A'}</strong>
                      <small className="text-muted">{item.allocationId || '-'}</small>
                    </div>
                  </td>
                  <td className="text-end">
                    <span className="h5 fw-bold text-primary">
                      {item.quantity || 0}
                    </span>
                    <br />
                    <small className="badge bg-light text-dark">{item.unit || 'Quintal'}</small>
                  </td>
                  <td>{item.warehouse || 'N/A'}</td>
                  <td>
                    <span className={`badge px-3 py-2 fs-6 ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === "PENDING" ? (
                      <Link
                        to={`/stock-issue/create?tokenId=${item.id}`}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-truck-flatbed me-1"></i>
                        Issue Stock
                      </Link>
                    ) : item.status === "APPROVED" ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => navigate(`/stock-issue/details/${item.id}`)}
                      >
                        <i className="bi bi-eye me-1"></i>
                        View Details
                      </button>
                    ) : (
                      <span className="badge bg-secondary">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Cards */}
      {tokens.length > 0 && (
        <div className="row mt-4 g-3">
          <div className="col-md-3">
            <div className="card bg-warning bg-opacity-10 border-warning">
              <div className="card-body text-center">
                <h3 className="text-warning mb-1">{tokens.filter(t => t.status === "PENDING").length}</h3>
                <small className="text-muted">Pending</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info bg-opacity-10 border-info">
              <div className="card-body text-center">
                <h3 className="text-info mb-1">{tokens.filter(t => t.status === "APPROVED").length}</h3>
                <small className="text-muted">Approved</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success bg-opacity-10 border-success">
              <div className="card-body text-center">
                <h3 className="text-success mb-1">{tokens.filter(t => t.status === "ISSUED").length}</h3>
                <small className="text-muted">Issued</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary bg-opacity-10 border-secondary">
              <div className="card-body text-center">
                <h3 className="text-secondary mb-1">{tokens.length}</h3>
                <small className="text-muted">Total</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueTokenList;












// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getStockIssueTokens } from "../../services/stockService";

// const IssueTokenList = () => {
//   const [tokens, setTokens] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getStockIssueTokens();
//       setTokens(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="container p-4">
//       <h4 className="mb-4">Stock Issue Requests</h4>

//       <table className="table table-bordered">
//         <thead className="table-light">
//           <tr>
//             <th>Token ID</th>
//             <th>Commodity</th>
//             <th>Quantity</th>
//             <th>Warehouse</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {tokens.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.commodity}</td>
//               <td>{item.quantity} {item.unit}</td>
//               <td>{item.warehouse}</td>
//               <td>{item.status}</td>
//               <td>
//                 {item.status === "PENDING" && (
//                   <Link
//                     to={`/stock-issue/create?tokenId=${item.id}`}
//                     className="btn btn-sm btn-primary"
//                   >
//                     Issue Stock
//                   </Link>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default IssueTokenList;
