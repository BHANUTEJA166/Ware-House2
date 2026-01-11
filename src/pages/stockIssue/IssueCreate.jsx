import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getStockIssueTokenById,
  createStockIssue
} from "../../services/stockService";
import axios from "axios";

const IssueCreate = () => {
  const [params] = useSearchParams();
  const tokenId = params.get("tokenId");
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const [form, setForm] = useState({
    vehicleNumber: "",
    driverName: "",
    issuedQuantity: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tokenId) {
      fetchToken();
    }
  }, [tokenId]);

  const fetchToken = async () => {
    try {
      setLoadingToken(true);
      setError("");
      
      console.log("🔍 Loading issue token:", tokenId);
      const data = await getStockIssueTokenById(tokenId);
      
      if (data) {
        setToken(data);
        // Pre-fill quantity from token
        setForm(prev => ({
          ...prev,
          issuedQuantity: data.quantity || ""
        }));
        console.log("🎫 Token loaded:", data);
      } else {
        setError(`Token ${tokenId} not found`);
      }
    } catch (err) {
      console.error("Error loading token:", err);
      setError("Failed to load token information");
    } finally {
      setLoadingToken(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        tokenId,
        vehicleNumber: form.vehicleNumber,
        driverName: form.driverName,
        issuedQuantity: form.issuedQuantity || token.quantity,
        issueDate: new Date().toISOString().split("T")[0],
        status: "ISSUED",
        id: `ISSUE-${Date.now()}`
      };

      console.log("🚚 Issuing stock:", payload);

      await createStockIssue(payload);
      
      setSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        navigate("/stock-issue/tokens");
      }, 3000);
      
    } catch (error) {
      console.error("Error issuing stock:", error);
      setError("Failed to issue stock. Please check details and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center p-5">
            <div className="alert alert-success">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill display-1 text-success"></i>
              </div>
              <h3>✅ Stock Issued Successfully!</h3>
              <p className="lead">
                Token <strong>{tokenId}</strong> has been issued to vehicle <strong>{form.vehicleNumber}</strong>
              </p>
              <div className="mt-4">
                <div className="spinner-border spinner-border-sm text-success" role="status"></div>
                <p className="mt-2 mb-0">Redirecting to issue requests...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-danger bg-opacity-90 text-white">
              <h4 className="mb-0">
                <i className="bi bi-box-arrow-down me-2"></i>
                Issue Stock
              </h4>
            </div>
            
            <div className="card-body">
              {loadingToken ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading token...</span>
                  </div>
                  <p className="mt-3">Loading issue request...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger">
                  <h5><i className="bi bi-exclamation-triangle me-2"></i>{error}</h5>
                  <button 
                    className="btn btn-outline-danger mt-3"
                    onClick={() => navigate("/stock-issue/tokens")}
                  >
                    ← Back to Requests
                  </button>
                </div>
              ) : token ? (
                <>
                  {/* Token Summary */}
                  <div className="alert alert-info mb-4">
                    <h6 className="mb-3">
                      <i className="bi bi-info-circle me-2"></i>
                      Issue Request Details
                    </h6>
                    <div className="row text-center text-md-start">
                      <div className="col-md-3">
                        <strong className="text-primary">Token ID:</strong><br />
                        <span className="badge bg-primary fs-6">{token.id}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Commodity:</strong><br />
                        <h6 className="text-success mb-0">{token.commodity}</h6>
                      </div>
                      <div className="col-md-3">
                        <strong>Quantity:</strong><br />
                        <h5 className="text-danger mb-0">
                          {token.quantity} {token.unit || "Quintal"}
                        </h5>
                      </div>
                      <div className="col-md-3">
                        <strong>Warehouse:</strong><br />
                        <p className="mb-0 fw-semibold">{token.warehouse}</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={submitHandler}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">
                          Vehicle Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="vehicleNumber"
                          className="form-control"
                          value={form.vehicleNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. TS09AB1234"
                          required
                          maxLength="15"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">
                          Driver Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="driverName"
                          className="form-control"
                          value={form.driverName}
                          onChange={handleInputChange}
                          placeholder="e.g. Ramesh Kumar"
                          required
                          maxLength="50"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-bold">Issued Quantity</label>
                        <input
                          type="number"
                          name="issuedQuantity"
                          className="form-control"
                          value={form.issuedQuantity}
                          onChange={handleInputChange}
                          min="1"
                          max={token.quantity}
                          placeholder={`Max: ${token.quantity}`}
                          required
                        />
                        <div className="form-text">
                          Max allowed: {token.quantity} {token.unit || "Quintal"}
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="alert alert-danger mt-3">{error}</div>
                    )}

                    <div className="d-grid d-md-flex gap-2 mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-danger btn-lg flex-fill"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Issuing Stock...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-truck-flatbed me-2"></i>
                            Confirm Issue
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg"
                        onClick={() => navigate("/stock-issue/tokens")}
                        disabled={loading}
                      >
                        <i className="bi bi-arrow-left me-1"></i>Cancel
                      </button>
                    </div>
                  </form>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCreate;





















// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import {
//   getStockIssueTokenById,
//   createStockIssue
// } from "../../services/stockService";

// const IssueCreate = () => {
//   const [params] = useSearchParams();
//   const tokenId = params.get("tokenId");
//   const navigate = useNavigate();

//   const [token, setToken] = useState(null);
//   const [form, setForm] = useState({
//     vehicleNumber: "",
//     driverName: ""
//   });

//   useEffect(() => {
//     const fetchToken = async () => {
//       const data = await getStockIssueTokenById(tokenId);
//       setToken(data);
//     };
//     fetchToken();
//   }, [tokenId]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     await createStockIssue({
//       tokenId,
//       vehicleNumber: form.vehicleNumber,
//       driverName: form.driverName,
//       issuedQuantity: token.quantity,
//       issueDate: new Date().toISOString().split("T")[0],
//       status: "ISSUED"
//     });

//     navigate("/stock-issue/tokens");
//   };

//   if (!token) return null;

//   return (
//     <div className="container p-4">
//       <h4>Issue Stock</h4>

//       <p><b>Commodity:</b> {token.commodity}</p>
//       <p><b>Quantity:</b> {token.quantity} {token.unit}</p>

//       <form onSubmit={submitHandler}>
//         <input
//           type="text"
//           placeholder="Vehicle Number"
//           className="form-control mb-3"
//           value={form.vehicleNumber}
//           onChange={(e) =>
//             setForm({ ...form, vehicleNumber: e.target.value })
//           }
//           required
//         />

//         <input
//           type="text"
//           placeholder="Driver Name"
//           className="form-control mb-3"
//           value={form.driverName}
//           onChange={(e) =>
//             setForm({ ...form, driverName: e.target.value })
//           }
//           required
//         />

//         <button className="btn btn-success">Confirm Issue</button>
//       </form>
//     </div>
//   );
// };

// export default IssueCreate;
