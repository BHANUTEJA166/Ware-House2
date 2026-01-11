import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReceiptByToken } from "../../services/stockService";

const ReceiptDetails = () => {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    loadReceipt();
  }, [tokenId]);

  const loadReceipt = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("🔍 Loading receipt for tokenId:", tokenId);
      
      const data = await getReceiptByToken(tokenId);
      console.log("📄 Receipt data received:", data);
      
      if (data) {
        setReceipt(data);
        
        // 🔥 Bonus: Try to find matching token for extra context
        try {
          const tokensResponse = await axios.get("/data/warehouses.json");
          const matchingToken = tokensResponse.data.stockReceiptTokens.find(
            t => String(t.tokenNo) === String(tokenId)
          );
          setTokenInfo(matchingToken);
        } catch (tokenErr) {
          console.log("Token context unavailable:", tokenErr);
        }
      } else {
        setError("No receipt found for this token");
      }
    } catch (err) {
      console.error("Error loading receipt:", err);
      setError("Failed to load receipt details");
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
      <section className="container p-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center p-5">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '4rem', height: '4rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5>Loading receipt details...</h5>
          </div>
        </div>
      </section>
    );
  }

  if (error || !receipt) {
    return (
      <section className="container p-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-triangle-fill display-5 mb-3 text-warning"></i>
              <h4>No Receipt Found</h4>
              <p className="lead">Receipt for token <strong>{tokenId}</strong> not found.</p>
              <button 
                className="btn btn-outline-primary"
                onClick={() => navigate("/stock-receipt/tokens")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Tokens
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container p-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h2 className="mb-1">
                <i className="bi bi-receipt text-primary me-2"></i>
                Receipt Details
              </h2>
              <p className="text-muted mb-0">
                Token: <strong className="text-primary">{receipt.tokenNo}</strong>
              </p>
            </div>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate("/stock-receipt/tokens")}
            >
              <i className="bi bi-arrow-left me-1"></i>Back
            </button>
          </div>

          <div className="row g-4">
            {/* Main Receipt Info */}
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-success bg-opacity-10 border-0">
                  <h5 className="mb-0 text-success fw-bold">
                    <i className="bi bi-check-circle me-2"></i>
                    Receipt Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-muted small">Token Number</label>
                      <h6 className="text-primary fw-bold">{receipt.tokenNo}</h6>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-muted small">Received Bags</label>
                      <h5 className="badge bg-success fs-5 px-4 py-2">
                        {receipt.receivedBags} bags
                      </h5>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold text-muted small">Received By</label>
                      <p className="mb-0 fw-semibold text-dark">{receipt.receivedBy}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-muted small">Received Date</label>
                      <p className="mb-0 fw-semibold">{formatDate(receipt.receivedDate)}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-muted small">Status</label>
                      <span className="badge bg-success px-3 py-2 fs-6">COMPLETED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-info bg-opacity-10 border-0">
                  <h6 className="mb-0 text-info fw-bold">
                    <i className="bi bi-chat-text me-2"></i>Remarks
                  </h6>
                </div>
                <div className="card-body">
                  <p className={`mb-0 ${!receipt.remarks ? 'text-muted' : ''}`}>
                    {receipt.remarks || <i> No remarks provided</i>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Context Info (if available) */}
          {tokenInfo && (
            <div className="row mt-4">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="bi bi-info-circle me-2 text-info"></i>
                      Source Token Information
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <strong>Reservation:</strong> {tokenInfo.reservationNo}
                      </div>
                      <div className="col-md-4">
                        <strong>Stack:</strong> {tokenInfo.stackNo}
                      </div>
                      <div className="col-md-4">
                        <strong>Expected:</strong> {tokenInfo.expectedBags} bags
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="row mt-4">
            <div className="col-12 text-end">
              <button 
                className="btn btn-success me-2 px-4"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer me-2"></i>Print Receipt
              </button>
              <a 
                href={`data:text/plain;charset=utf-8,Receipt%20${receipt.tokenNo}%0AReceived%20Bags%3A%20${receipt.receivedBags}%0ABy%3A%20${receipt.receivedBy}%0ADate%3A%20${receipt.receivedDate}`}
                className="btn btn-outline-primary px-4"
                download={`receipt-${receipt.tokenNo}.txt`}
              >
                <i className="bi bi-download me-2"></i>Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceiptDetails;









// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getReceiptByToken } from "../../services/stockService";

// const ReceiptDetails = () => {
//   const { tokenId } = useParams();
//   const [receipt, setReceipt] = useState(null);

//   useEffect(() => {
//     loadReceipt();
//   }, []);

//   const loadReceipt = async () => {
//     const data = await getReceiptByToken(tokenId);
//     setReceipt(data);
//   };

//   if (!receipt) {
//     return <p className="p-4">Loading receipt details...</p>;
//   }

//   return (
//     <section className="container p-4">
//       <h4 className="mb-3">Stock Receipt Details</h4>

//       <table className="table table-bordered col-lg-6">
//         <tbody>
//           <tr>
//             <th>Token No</th>
//             <td>{receipt.tokenNo}</td>
//           </tr>
//           <tr>
//             <th>Received Bags</th>
//             <td>{receipt.receivedBags}</td>
//           </tr>
//           <tr>
//             <th>Received By</th>
//             <td>{receipt.receivedBy}</td>
//           </tr>
//           <tr>
//             <th>Received Date</th>
//             <td>{receipt.receivedDate}</td>
//           </tr>
//           <tr>
//             <th>Remarks</th>
//             <td>{receipt.remarks}</td>
//           </tr>
//         </tbody>
//       </table>
//     </section>
//   );
// };

// export default ReceiptDetails;


// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { getReceiptByToken } from "../../services/stockService";

// // const ReceiptDetails = () => {
// //   const { tokenId } = useParams();
// //   const [receipt, setReceipt] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     loadReceipt();
// //   }, [tokenId]);

// //   const loadReceipt = async () => {
// //     try {
// //       setLoading(true);
// //       console.log("Loading receipt for tokenId:", tokenId); // 🔥 DEBUG
// //       const data = await getReceiptByToken(tokenId);
// //       console.log("Receipt data received:", data); // 🔥 DEBUG
// //       setReceipt(data);
// //       setError(null);
// //     } catch (err) {
// //       console.error("Error loading receipt:", err);
// //       setError("Failed to load receipt details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return <p className="p-4">Loading receipt details...</p>;
// //   }

// //   if (error) {
// //     return <p className="p-4 text-danger">{error}</p>;
// //   }

// //   if (!receipt) {
// //     return <p className="p-4 text-warning">No receipt found for this token.</p>;
// //   }

// //   return (
// //     <section className="container p-4">
// //       <h4 className="mb-3">Stock Receipt Details</h4>

// //       <table className="table table-bordered col-lg-6">
// //         <tbody>
// //           <tr>
// //             <th>Token No</th>
// //             <td>{receipt.tokenNo}</td>
// //           </tr>
// //           <tr>
// //             <th>Received Bags</th>
// //             <td>{receipt.receivedBags}</td>
// //           </tr>
// //           <tr>
// //             <th>Received By</th>
// //             <td>{receipt.receivedBy}</td>
// //           </tr>
// //           <tr>
// //             <th>Received Date</th>
// //             <td>{receipt.receivedDate}</td>
// //           </tr>
// //           <tr>
// //             <th>Remarks</th>
// //             <td>{receipt.remarks}</td>
// //           </tr>
// //         </tbody>
// //       </table>
// //     </section>
// //   );
// // };

// // export default ReceiptDetails;
