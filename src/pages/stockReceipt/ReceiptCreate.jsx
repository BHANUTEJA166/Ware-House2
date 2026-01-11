import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createStockReceipt, getReceiptTokens } from "../../services/stockService";

const ReceiptCreate = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const tokenNo = params.get("tokenNo");
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);

  const [form, setForm] = useState({
    tokenNo: tokenNo || "",
    receivedBags: "",
    remarks: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Load token details when component mounts
  useEffect(() => {
    if (tokenNo) {
      loadTokenInfo();
    }
  }, [tokenNo]);

  const loadTokenInfo = async () => {
    try {
      setLoadingToken(true);
      const tokens = await getReceiptTokens();
      const token = tokens.find(t => String(t.tokenNo) === String(tokenNo));
      
      if (token) {
        setTokenInfo(token);
        console.log("🎫 Token found:", token);
      } else {
        setError("Token not found!");
      }
    } catch (err) {
      console.error("Error loading token:", err);
      setError("Failed to load token information");
    } finally {
      setLoadingToken(false);
    }
  };

  const changeData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        receivedBy: "Warehouse Supervisor",
        receivedDate: new Date().toISOString().split("T")[0],
        id: `RCPT-${Date.now()}`
      };

      console.log("📥 Submitting receipt:", payload);

      await createStockReceipt(payload);
      
      setSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        navigate("/stock-receipt/tokens");
      }, 2500);
      
    } catch (error) {
      console.error("Error creating receipt:", error);
      setError("Failed to create receipt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="container p-4">
        <div className="alert alert-success text-center p-5">
          <div className="mb-4">
            <i className="bi bi-check-circle-fill display-1 text-success"></i>
          </div>
          <h3>✅ Receipt Created Successfully!</h3>
          <p className="lead">Stock receipt for <strong>{tokenNo}</strong> has been recorded.</p>
          <p>Redirecting to tokens list...</p>
          <div className="spinner-border spinner-border-sm text-success" role="status"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="container p-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-truck me-2"></i>
                Receive Stock
              </h4>
            </div>
            <div className="card-body">
              {loadingToken ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading token...</span>
                  </div>
                </div>
              ) : tokenInfo ? (
                <>
                  {/* Token Summary Card */}
                  <div className="alert alert-info mb-4">
                    <h6><strong>Token Details:</strong></h6>
                    <div className="row">
                      <div className="col-md-3"><strong>Token:</strong> {tokenInfo.tokenNo}</div>
                      <div className="col-md-3"><strong>Reservation:</strong> {tokenInfo.reservationNo}</div>
                      <div className="col-md-3"><strong>Stack:</strong> {tokenInfo.stackNo}</div>
                      <div className="col-md-3">
                        <strong>Expected:</strong> <span className="badge bg-warning">{tokenInfo.expectedBags}</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={submitHandler}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Token Number</label>
                      <input
                        type="text"
                        value={form.tokenNo}
                        disabled
                        className="form-control bg-light"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Received Bags <span className="text-danger">*</span></label>
                      <input
                        type="number"
                        name="receivedBags"
                        value={form.receivedBags}
                        onChange={changeData}
                        className="form-control"
                        min="0"
                        max={tokenInfo.expectedBags}
                        placeholder={`Max: ${tokenInfo.expectedBags}`}
                        required
                      />
                      <div className="form-text">
                        Max expected: {tokenInfo.expectedBags} bags
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Remarks</label>
                      <textarea
                        name="remarks"
                        value={form.remarks}
                        onChange={changeData}
                        rows="3"
                        className="form-control"
                        placeholder="Condition of stock, any damages, etc..."
                      />
                    </div>

                    {error && (
                      <div className="alert alert-danger mb-4">{error}</div>
                    )}

                    <div className="d-grid d-md-flex gap-2">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg flex-fill"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-2"></i>
                            Submit Receipt
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg"
                        onClick={() => navigate("/stock-receipt/tokens")}
                        disabled={loading}
                      >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="alert alert-warning text-center">
                  <h5>⚠️ Invalid Token</h5>
                  <p>Token <strong>{tokenNo}</strong> not found or already processed.</p>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/stock-receipt/tokens")}
                  >
                    ← Back to Tokens
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceiptCreate;
















// import React, { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { createStockReceipt } from "../../services/stockService";

// const ReceiptCreate = () => {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   const tokenNo = params.get("tokenNo");

//   const [form, setForm] = useState({
//     tokenNo: tokenNo || "",
//     receivedBags: "",
//     remarks: ""
//   });

//   const changeData = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...form,
//       receivedBy: "Warehouse Supervisor",
//       receivedDate: new Date().toISOString().split("T")[0]
//     };

//     await createStockReceipt(payload);
//     navigate("/stock-receipt/tokens");
//   };

//   return (
//     <section className="container p-4">
//       <h4 className="mb-3">Receive Stock</h4>

//       <form onSubmit={submitHandler} className="col-lg-6">
//         <div className="mb-3">
//           <label className="form-label">Token Number</label>
//           <input
//             type="text"
//             value={form.tokenNo}
//             disabled
//             className="form-control"
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Received Bags</label>
//           <input
//             type="number"
//             name="receivedBags"
//             onChange={changeData}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Remarks</label>
//           <textarea
//             name="remarks"
//             onChange={changeData}
//             className="form-control"
//           />
//         </div>

//         <button className="btn btn-primary">Submit Receipt</button>
//       </form>
//     </section>
//   );
// };

// export default ReceiptCreate;
