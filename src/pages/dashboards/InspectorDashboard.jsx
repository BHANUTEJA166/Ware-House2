import React, { useEffect, useState } from "react";
import axios from "axios";

const InspectorDashboard = () => {
  const [metrics, setMetrics] = useState({
    reservations: 0,
    inward: 0,
    outward: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/data/warehouses.json");
        const data = res.data;
        
        setMetrics({
          reservations: data.reservations?.length || 0,
          inward: data.stockReceipts?.length || 0,
          outward: data.stockIssues?.length || 0
        });
      } catch (error) {
        console.error("Error loading metrics:", error);
        setMetrics({ reservations: 0, inward: 0, outward: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="container p-4"><p>Loading...</p></div>;
  }

  return (
    <div className="container p-4">
      <h4>Inspector Dashboard</h4>
      
      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <th>Total Reservations</th>
            <td>{metrics.reservations}</td>
          </tr>
          <tr>
            <th>Stock Inward</th>
            <td>{metrics.inward}</td>
          </tr>
          <tr>
            <th>Stock Outward</th>
            <td>{metrics.outward}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InspectorDashboard;












// import React from "react";
// import { useSelector } from "react-redux";

// const InspectorDashboard = () => {
//   const { metrics } = useSelector(state => state.dashboard);

//   return (
//     <div className="container p-4">
//       <h4>Inspector Dashboard</h4>

//       <table className="table table-bordered mt-3">
//         <tbody>
//           <tr>
//             <th>Total Reservations</th>
//             <td>{metrics.reservations}</td>
//           </tr>
//           <tr>
//             <th>Stock Inward</th>
//             <td>{metrics.inward}</td>
//           </tr>
//           <tr>
//             <th>Stock Outward</th>
//             <td>{metrics.outward}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InspectorDashboard;
