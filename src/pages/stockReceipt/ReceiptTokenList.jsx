import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceiptTokens } from "../../services/stockService";

const ReceiptTokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      const data = await getReceiptTokens();
      console.log("📥 RECEIPT TOKENS LOADED:", data);
      setTokens(data || []);
    } catch (error) {
      console.error("Error loading receipt tokens:", error);
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReceive = (tokenNo) => {
    navigate(`/stock-receipt/create?tokenNo=${tokenNo}`);
  };

  const handleViewReceipt = (tokenNo) => {
    navigate(`/stock-receipt/tokens/${tokenNo}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "bg-warning text-dark";
      case "RECEIVED": return "bg-success";
      case "COMPLETED": return "bg-info";
      default: return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <section className="container p-4">
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading tokens...</span>
          </div>
          <p className="mt-3">Loading receipt tokens...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Stock Receipt Tokens</h4>
        <span className="badge bg-primary fs-6">{tokens.length} Tokens</span>
      </div>

      {tokens.length === 0 ? (
        <div className="alert alert-info d-flex align-items-center">
          <i className="bi bi-info-circle me-2"></i>
          <div>
            <strong>No receipt tokens available.</strong>
            <br />
            Tokens are generated after stack allocation.
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Token No</th>
                <th>Reservation</th>
                <th>Stack</th>
                <th>Expected Bags</th>
                <th>Status</th>
                <th style={{ width: "160px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {tokens.map((t) => (
                <tr key={t.id} className="align-middle">
                  <td>
                    <strong className="text-primary">{t.tokenNo}</strong>
                  </td>
                  <td>{t.reservationNo || 'N/A'}</td>
                  <td>{t.stackNo || 'N/A'}</td>
                  <td className="text-end">
                    <span className="fw-bold">{t.expectedBags || 0}</span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusColor(t.status)} px-3 py-2`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      {t.status === "PENDING" ? (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleReceive(t.tokenNo)}
                          title="Receive stock for this token"
                        >
                          <i className="bi bi-truck me-1"></i>
                          Receive
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => handleViewReceipt(t.tokenNo)}
                          title="View receipt details"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View Receipt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ReceiptTokenList;
















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getReceiptTokens } from "../../services/stockService";

// const ReceiptTokenList = () => {
//   const [tokens, setTokens] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTokens();
//   }, []);

//   const fetchTokens = async () => {
//     const data = await getReceiptTokens();
//     console.log("RECEIPT TOKENS:", data);
//     setTokens(data);
//   };

//   const handleReceive = (tokenNo) => {
//     navigate(`/stock-receipt/create?tokenNo=${tokenNo}`);
//   };

//   const handleViewReceipt = (tokenNo) => {
//     navigate(`/stock-receipt/tokens/${tokenNo}`);
//   };

//   return (
//     <section className="container p-4">
//       <h4 className="mb-3">Stock Receipt Tokens</h4>

//       {tokens.length === 0 ? (
//         <p>No receipt tokens available.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="table-light">
//             <tr>
//               <th>Token No</th>
//               <th>Reservation</th>
//               <th>Stack</th>
//               <th>Expected Bags</th>
//               <th>Status</th>
//               <th style={{ width: "160px" }}>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {tokens.map((t) => (
//               <tr key={t.id}>
//                 <td>{t.tokenNo}</td>
//                 <td>{t.reservationNo}</td>
//                 <td>{t.stackNo}</td>
//                 <td>{t.expectedBags}</td>
//                 <td>
//                   <span
//                     className={
//                       t.status === "PENDING"
//                         ? "badge bg-warning text-dark"
//                         : "badge bg-success"
//                     }
//                   >
//                     {t.status}
//                   </span>
//                 </td>
//                 <td>
//                   {t.status === "PENDING" ? (
//                     <button
//                       className="btn btn-sm btn-success"
//                       onClick={() => handleReceive(t.tokenNo)}
//                     >
//                       Receive
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-sm btn-info"
//                       onClick={() => handleViewReceipt(t.tokenNo)}
//                     >
//                       View Receipt
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </section>
//   );
// };

// export default ReceiptTokenList;
